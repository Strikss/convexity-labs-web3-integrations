import { getUsdt0Trades } from "@/api/web3/getUsdt0Trades";
import { Balances } from "./blocks/Balances";
import { Trades } from "./blocks/Trades";
import { USER_ADDRESS } from "@/web3/addresses";
import { getGasBalance } from "@/api/web3/getGasBalance";
import { getUsdt0Balance } from "@/api/web3/getUsdt0Balance";

export const revalidate = 0;

export default async function Home() {
	const tradesData = await getUsdt0Trades(USER_ADDRESS);
	const hypeBalance = await getGasBalance(USER_ADDRESS);
	const usdt0Balance = await getUsdt0Balance(USER_ADDRESS);

	return (
		<section className="flex flex-col gap-4">
			<Balances initialHypeBalance={hypeBalance} initialUsdt0Balance={usdt0Balance} />
			<Trades initialTradesData={tradesData} />
		</section>
	);
}
