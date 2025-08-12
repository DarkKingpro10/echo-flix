import type { Metadata } from "next";
import "./globals.css";
import { PoppinsFont } from "@/shared/styles/fonts";

export const metadata: Metadata = {
	title: "Echo-Flix- Next.js",
	description: "Prueba técnica de Next.js para la empresa Echo-Tech",
	robots: { index: true, follow: true },
	openGraph: {
		title: "Echo-Flix- Next.js - Jesús Esquivel",
		description: "Prueba técnica de Next.js para la empresa Echo-Tech",
		url: "https://echo-flix-next.vercel.app/",
		siteName: "Echo-Flix- Next.js",
		type: "website",
		locale: "es_ES",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${PoppinsFont.className} antialiased`}>{children}</body>
		</html>
	);
}
