import { getUsdt0Trades } from "@/api/web3/getUsdt0Trades";
import { Balances } from "./blocks/Balances";
import { Trades } from "./blocks/Trades";
import { USER_ADDRESS } from "@/web3/addresses";

export const revalidate = 0;

export default async function Home() {
	const tradesData = await getUsdt0Trades(USER_ADDRESS);
	return (
		<section className="flex flex-col gap-4">
			<Balances />
			<Trades data={tradesData} />
		</section>
	);
}
