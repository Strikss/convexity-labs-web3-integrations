import { chainSpecificInfo } from "@/web3/chainSpecificData";
import publicClient from "../../web3";

import { Address } from "viem";
import { WEB3_KEYS } from "./keys";
import { useQuery } from "@tanstack/react-query";
import { USER_ADDRESS } from "@/web3/addresses";

const initialData = { balance: "0", ticker: "HYPE" };

async function getGasBalance(address: Address) {
	const balance = await publicClient.getBalance({
		address,
	});

	const balanceInTokens = chainSpecificInfo.defaultFormatter(balance);

	return {
		ticker: "HYPE",
		balance: balanceInTokens,
	};
}

const useGetGasBalance = (propData?: Awaited<ReturnType<typeof getGasBalance>>) => {
	return useQuery({
		queryKey: WEB3_KEYS.HYPER_BALANCE,
		queryFn: () => getGasBalance(USER_ADDRESS),
		initialData: propData || initialData,
		refetchInterval: 10000,
		refetchOnMount: false,
	});
};

export { useGetGasBalance, getGasBalance };
