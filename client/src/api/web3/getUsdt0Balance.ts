import { erc20Abi } from "viem";
import publicClient from "@/web3";
import { USTD0_ADDRESS } from "@/web3/addresses";
import { chainSpecificInfo } from "@/web3/chainSpecificData";

const initialData = { balance: 0, ticker: "USDT0" };
export async function getUsdt0Balance(address: `0x${string}`) {
	try {
		const balance = await publicClient.readContract({
			address: USTD0_ADDRESS,
			abi: erc20Abi,
			functionName: "balanceOf",
			args: [address],
		});

		const balanceInTokens = chainSpecificInfo.defaultFormatter(balance, 6);

		return {
			ticker: "USDT0",
			balance: balanceInTokens,
		};
	} catch (error) {
		console.error("Error fetching USDT0 balance:", error);
		return initialData;
	}
}
