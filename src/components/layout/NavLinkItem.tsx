"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLinkItemProps = {
	path: string;
	label: string;
	icon: React.ReactNode;
};

export default function NavLinkItem({ icon, label, path }: NavLinkItemProps) {
	const pathname = usePathname();
	return (
		<Link
			className={clsx(
				"flex gap-1 border-2 px-8 py-1.5 rounded-lg transition-all duration-500", pathname !== path ? "bg-primary border-secondary hover:scale-[1.1] hover:bg-secondary hover:border-primary" : "bg-secondary border-primary",
			)}
			href={path}
		>
			{icon}
			{label}
		</Link>
	);
}
