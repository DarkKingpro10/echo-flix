import Image from "next/image";
import logo from "@/assets/imgs/navBar-icon.webp";
import Link from "next/link";
import { ThemeToggleButton } from "../ThemeToggleButton";
import NavList from "./NavList";

export default function Nav() {
	return (
		<header className="w-full bg-primary dark:bg-zinc-900 px-5 md:px-16 py-2.5 h-[80px] flex items-center justify-between text-white relative overflow-hidden shadow-md">
			{/** Logo */}
			<div className="flex items-center md:gap-10">
				<Link href="/">
					<Image
						src={logo}
						alt="Echo-Flix Logo"
						width={50}
						height={50}
						className="object-contain"
						priority
					/>
				</Link>
				<div className="text-4xl font-bold md:text-5xl md:static md:-translate-0 absolute left-1/2 -translate-x-1/2">
					Echo Flix
				</div>
			</div>
			{/** Titulo */}
			{/** Botón de cambio de tema y menu*/}
			<div className="flex gap-4 items-center">
				<NavList />
				<ThemeToggleButton />
			</div>
		</header>
	);
}
