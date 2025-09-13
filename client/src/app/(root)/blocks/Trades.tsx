"use client";
import { GetUsdt0TradesResponse, useGetUsdt0Trades } from "@/api/web3/getUsdt0Trades";
import { useState } from "react";
import { TradesRow } from "./TradesRow";

const tableHeaders = ["Date", "Amount", "From", "To"];

type TradesProps = {
	initialTradesData: GetUsdt0TradesResponse;
};

export function Trades({ initialTradesData }: TradesProps) {
	const { trades } = useGetUsdt0Trades(initialTradesData).data;
	const [search, setSearch] = useState("");

	const tradesToRender = trades.filter(
		(trade) => trade.from?.includes(search) || trade.to?.includes(search)
	);

	return (
		<section className="flex flex-col gap-4 border border-gray-200 rounded-md p-4 m-4">
			<h2 className="text-lg font-bold">USDT0 Transfer History</h2>
			<input
				className="border border-gray-200 rounded-md p-2"
				type="text"
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<table>
				<thead>
					<tr>
						{tableHeaders.map((header) => (
							<th key={header} className="text-left">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tradesToRender.map((trade) => (
						<TradesRow key={trade.transactionHash} trade={trade} />
					))}
				</tbody>
			</table>
		</section>
	);
}
