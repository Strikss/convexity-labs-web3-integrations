import { defineChain } from "viem";

const hyperEvm = defineChain({
	id: 999,
	name: "HyperEVM",
	nativeCurrency: {
		decimals: 18,
		name: "Hype",
		symbol: "HYPE",
	},
	rpcUrls: {
		default: {
			// Alchemy key only used for the take home test
			http: ["https://rpc.hyperliquid.xyz/evm"],
		},
	},
	blockExplorers: {
		default: { name: "Explorer", url: "https://www.hyperscan.com/" },
	},
	blockTime: 1_000,
	contracts: {
		multicall3: {
			address: "0xcA11bde05977b3631167028862bE2a173976CA11",
			blockCreated: 13051,
		},
	},
});
const defaultFormatter = (value: bigint, decimals = 18) => {
	return (Number(value) / Math.pow(10, decimals)).toFixed(6);
};

export const chainSpecificInfo = {
	hyperEvm,
	defaultFormatter,
};
