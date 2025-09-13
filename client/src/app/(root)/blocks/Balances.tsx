"use client";
import { useGetGasBalance } from "@/api/web3/getGasBalance";
import { useGetUsdt0Balance } from "@/api/web3/getUsdt0Balance";
import DelayedCounter from "@/ui/DelayedCounter";

type BalancesProps = {
	initialHypeBalance: {
		balance: string;
		ticker: string;
	};
	initialUsdt0Balance: {
		balance: string;
		ticker: string;
	};
};

export function Balances({ initialHypeBalance, initialUsdt0Balance }: BalancesProps) {
	const { balance: usdt0Balance, ticker: usdt0Ticker } = useGetUsdt0Balance(initialUsdt0Balance).data;
	const { balance: hypeBalance, ticker: hypeTicker } = useGetGasBalance(initialHypeBalance).data;

	const balances = [
		{
			balance: hypeBalance,
			ticker: hypeTicker,
		},
		{
			balance: usdt0Balance,
			ticker: usdt0Ticker,
		},
	];
	return (
		<div className="flex gap-x-4 p-4">
			{balances.map((balance) => (
				<div className="space-y-4 border border-gray-200 rounded-md p-4" key={balance.ticker}>
					<h2 className="text-lg font-bold">{balance.ticker} Balance</h2>
					<p>
						<DelayedCounter value={balance.balance} suffix={` ${balance.ticker}`} />
					</p>
				</div>
			))}
		</div>
	);
}
