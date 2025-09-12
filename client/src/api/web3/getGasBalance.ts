import { chainSpecificInfo } from "@/web3/chainSpecificData";
import publicClient from "../../web3";

import { Address } from "viem";

const initialData = { balance: 0, ticker: "HYPE" };

export async function getGasBalance(address: Address) {
	try {
		const balance = await publicClient.getBalance({
			address,
		});

		const balanceInTokens = chainSpecificInfo.defaultFormatter(balance);

		return {
			ticker: "HYPE",
			balance: balanceInTokens,
		};
	} catch (error) {
		console.error("Error fetching gas balance:", error);
		return initialData;
	}
}
