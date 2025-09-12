import { getUsdt0Trades } from "@/api/web3/getUsdt0Trades";
import { Balances } from "./blocks/Balances";
import { Trades } from "./blocks/Trades";

export default async function Home() {
	const tradesData = await getUsdt0Trades();
	return (
		<section className="flex flex-col gap-4">
			<Balances />
			<Trades data={tradesData} />
		</section>
	);
}
