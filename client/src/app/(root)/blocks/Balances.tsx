import { getGasBalance } from "@/api/web3/getGasBalance";
import { getUsdt0Balance } from "@/api/web3/getUsdt0Balance";
import DelayedCounter from "@/ui/DelayedCounter";
import { USER_ADDRESS } from "@/web3/addresses";

export async function Balances() {
	const { balance: usdt0Balance, ticker: usdt0Ticker } = await getUsdt0Balance(USER_ADDRESS);
	const { balance: hypeBalance, ticker: hypeTicker } = await getGasBalance(USER_ADDRESS);

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
