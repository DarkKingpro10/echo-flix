import Image from "next/image";
import logo from "@/assets/imgs/navBar-icon.webp";

export default function Nav() {
	return (
		<>
			<header className="w-full bg-primary px-5 py-2.5 h-[80px] flex items-center justify-between text-white relative">
				{/** Logo */}
				<div>
					<Image
						src={logo}
						alt="Echo-Flix Logo"
						width={50}
						height={50}
						className="object-contain"
						priority
					/>
				</div>
				{/** Titulo */}
				<div className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold md:text-5xl md:static md:translate-x-0">Echo Flix</div>
        
			</header>
		</>
	);
}
