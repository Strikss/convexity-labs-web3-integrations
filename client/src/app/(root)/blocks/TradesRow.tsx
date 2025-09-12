import { GetUsdt0TradesResponse } from "@/api/web3/getUsdt0Trades";

export function TradesRow({ trade }: { trade: GetUsdt0TradesResponse["trades"][0] }) {
	return (
		<tr>
			<td>{trade.blockNumber}</td>
			<td>{trade.valueFormatted}</td>
			<td>{trade.from}</td>
			<td>{trade.to}</td>
		</tr>
	);
}
