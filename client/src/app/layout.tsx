import type { Metadata } from "next";
import { geistSans, geistMono } from "@/styles/fonts";
import { USER_ADDRESS } from "@/constants/addresses";
import clsx from "clsx";
import { PropsWithChildren } from "react";

import "@/styles/tailwind.css";

export const metadata: Metadata = {
	title: `${USER_ADDRESS} - HyperEVM Portfolio`,
	description: "Track your HYPE and USDT0 balances on HyperEVM",
};

function BaseLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body className={clsx(geistSans.variable, geistMono.variable, "antialiased")}>
				{children}
			</body>
		</html>
	);
}

function RootLayout({ children }: PropsWithChildren) {
	return <BaseLayout>{children}</BaseLayout>;
}

export default RootLayout;
