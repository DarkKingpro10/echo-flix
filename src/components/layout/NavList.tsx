"use client";
import { Clapperboard, Heart, Menu, MonitorPlay, X } from "lucide-react";
import Link from "next/link";
import NavLinkItem, { NavLinkItemProps } from "./NavLinkItem";
import { useState } from "react";

export default function NavList() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const routes: NavLinkItemProps[] = [
		{ label: "Películas", path: "/movies", icon: <Clapperboard /> },
    { label: "Series", path: "/series", icon: <MonitorPlay /> },
		{ label: "Favoritos", path: "/favorites", icon: <Heart /> },
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
	};

	return (
		<nav className="flex items-center justify-center">
			{/* Botón del menú móvil */}
			<button
				onClick={toggleMenu}
				className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
				aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
			>
				{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Lista de navegación desktop */}
			<ul className="md:flex space-x-4 hidden">
				{routes.map(({ icon, label, path }, index) => (
					<li key={index}>
						<NavLinkItem path={path} label={label} icon={icon} />
					</li>
				))}
			</ul>

			{/* Overlay del menú móvil */}
			<div
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
					isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={toggleMenu}
			/>

			{/* Menú móvil */}
			<div
				className={`fixed top-0 right-0 h-full w-64 bg-zinc-100 dark:bg-zinc-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="p-5 flex flex-col gap-4">
					<div className="h-[70px] flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700">
						<span className="text-black text-xl font-semibold dark:text-white">Menú</span>
						<button
							onClick={toggleMenu}
							className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
							aria-label="Cerrar menú"
						>
							<X size={24} className="text-black dark:text-white" />
						</button>
					</div>
					{routes.map(({ icon, label, path }, index) => (
            <NavLinkItem onClick={toggleMenu} key={index} path={path} label={label} icon={icon} />
						// <Link
						// 	key={index}
						// 	href={path}
						// 	className="p-3 flex items-center gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-900 dark:text-white"
						// 	onClick={toggleMenu}
						// >
						// 	{icon}
						// 	{label}
						// </Link>
					))}
				</div>
			</div>
		</nav>
	);
}
