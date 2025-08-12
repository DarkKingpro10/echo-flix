import { Clapperboard, Heart } from "lucide-react";
import Link from "next/link";
import NavLinkItem, { NavLinkItemProps } from "./NavLinkItem";

export default function NavList() {
	const routes: NavLinkItemProps[] = [
		{ label: "Películas", path: "/", icon: <Clapperboard /> },
		{ label: "Favoritos", path: "/favorites", icon: <Heart /> },
	];
	return (
		<nav className="flex items-center justify-center gap-4">
			<ul className="md:flex space-x-4 hidden">
				{routes.map(({ icon, label, path }, index) => (
					<li key={index}>
						<NavLinkItem path={path} label={label} icon={icon} />
					</li>
				))}
			</ul>
		</nav>
	);
}
