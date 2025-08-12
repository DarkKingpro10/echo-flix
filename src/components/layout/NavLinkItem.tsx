import Link from "next/link";

export type NavLinkItemProps = {
	path: string;
	label: string;
	icon: React.ReactNode;
};

export default function NavLinkItem({ icon, label, path }: NavLinkItemProps) {
	return (
		<Link className="flex gap-1 bg-primary border-secondary border-2 px-8 py-1 rounded-lg hover:scale-[1.1] hover:bg-secondary hover:border-primary transition-all duration-500 " href={path}>
			{icon}
			{label}
		</Link>
	);
}
