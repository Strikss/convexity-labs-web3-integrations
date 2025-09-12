import { truncateAddress } from "@/utils/truncateAddress";
import { USER_ADDRESS } from "@/web3/addresses";

export function Header() {
	return (
		<header className="flex items-center p-4 border-b border-gray-200">
			<h1 className="text-2xl font-bold">{truncateAddress(USER_ADDRESS)}</h1>
		</header>
	);
}
