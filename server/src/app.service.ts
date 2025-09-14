import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hyperEvm } from './utils/hyperevm';
import { createPublicClient, erc20Abi, http, formatUnits } from 'viem';
import { Transfer } from './entities/transfer.entity';

const USTD0_ADDRESS = '0xaa480c5f5eb436d0645189ca20e5ade13aecaf27';
const USER_ADDRESS = '0xde7D4ca820d141d655420D959AfFa3920bb1E07A';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly client = createPublicClient({
    chain: hyperEvm,
    transport: http(),
  });

  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
  ) {}

  async onApplicationBootstrap() {
    await this.indexUsdt0Transfers();
    console.log(
      'Server started successfully. Use /index-transfers endpoint to run indexing manually.',
    );
  }

  async indexUsdt0Transfers(maxBlocksToProcess: number = 100) {
    const transferEvent = erc20Abi.find(
      (abi) => abi.type === 'event' && abi.name === 'Transfer',
    )!;

    const latestBlock = await this.client.getBlockNumber();
    const startBlock = latestBlock - BigInt(maxBlocksToProcess);
    const maxBlockRange = 10n;

    const endBlock = startBlock + BigInt(maxBlocksToProcess);
    const actualEndBlock = endBlock > latestBlock ? latestBlock : endBlock;

    console.log(
      `Indexing transfers from block ${startBlock} to ${actualEndBlock} (limited to ${maxBlocksToProcess} blocks)`,
    );

    for (
      let fromBlock = startBlock;
      fromBlock <= actualEndBlock;
      fromBlock += maxBlockRange
    ) {
      const toBlock =
        fromBlock + maxBlockRange - 1n > actualEndBlock
          ? actualEndBlock
          : fromBlock + maxBlockRange - 1n;

      try {
        console.log(`Fetching logs from block ${fromBlock} to ${toBlock}`);

        const logs = await this.client.getLogs({
          address: USTD0_ADDRESS,
          event: transferEvent,
          args: { from: USER_ADDRESS, to: null },
          fromBlock,
          toBlock,
        });

        for (const log of logs) {
          if (!log.args.from || !log.args.to || !log.args.value) {
            console.warn(`Skipping transfer with missing args:`, log);
            continue;
          }

          const transfer = this.transferRepository.create({
            from: log.args.from as string,
            to: log.args.to as string,
            value: log.args.value.toString(),
            transactionHash: log.transactionHash,
            blockNumber: Number(log.blockNumber),
            logIndex: log.logIndex,
          });

          const existingTransfer = await this.transferRepository.findOne({
            where: {
              transactionHash: log.transactionHash,
              logIndex: log.logIndex,
            },
          });

          if (!existingTransfer) {
            await this.transferRepository.save(transfer);
            console.log(`Stored transfer: ${log.transactionHash}`);
          } else {
            console.log(`Transfer already exists: ${log.transactionHash}`);
          }
        }

        console.log(
          `Processed ${logs.length} transfers from block ${fromBlock} to ${toBlock}`,
        );
      } catch (error) {
        console.error(
          `Error processing blocks ${fromBlock} to ${toBlock}:`,
          error,
        );
      }
    }

    console.log('Transfer indexing completed');
    return {
      message: 'Indexing completed',
      blocksProcessed: Number(actualEndBlock - startBlock),
    };
  }

  async getGasBalance() {
    const balance = await this.client.getBalance({
      address: USER_ADDRESS as `0x${string}`,
    });

    return {
      address: USER_ADDRESS,
      balance: balance.toString(),
      formatted: formatUnits(balance, 18),
      symbol: 'HYPE',
    };
  }

  async getUsdt0Balance() {
    const balance = await this.client.readContract({
      address: USTD0_ADDRESS as `0x${string}`,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [USER_ADDRESS as `0x${string}`],
    });

    return {
      address: USER_ADDRESS,
      tokenAddress: USTD0_ADDRESS,
      balance: balance.toString(),
      formatted: formatUnits(balance, 6),
      symbol: 'USDT0',
    };
  }

  async getUsdt0Trades() {
    const transfers = await this.transferRepository.find({
      where: { from: USER_ADDRESS },
      order: { blockNumber: 'DESC' },
    });

    return transfers.map((transfer) => ({
      id: transfer.id,
      from: transfer.from,
      to: transfer.to,
      value: transfer.value,
      formatted: formatUnits(BigInt(transfer.value), 6),
      transactionHash: transfer.transactionHash,
      blockNumber: transfer.blockNumber,
      logIndex: transfer.logIndex,
      createdAt: transfer.createdAt,
    }));
  }
}
