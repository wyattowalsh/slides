import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";

export const metadata = {
	description: "Development documentation for the slides workspace.",
	title: "Slides Docs",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="flex min-h-screen flex-col">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
