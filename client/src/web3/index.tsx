import { createPublicClient, http } from "viem";
import { chainSpecificInfo } from "./chainSpecificData";

const publicClient = createPublicClient({
	chain: chainSpecificInfo.hyperEvm,
	transport: http(),
});

export default publicClient;
