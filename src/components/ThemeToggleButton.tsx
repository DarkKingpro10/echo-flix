"use client";
import { useEffect, useState } from "react";

enum ThemeTypes {
	Light = "light",
	Dark = "dark",
}

export function ThemeToggleButton() {
	const [theme, setTheme] = useState<ThemeTypes>(ThemeTypes.Light);

	// Obtener y aplicar el tema cuando el componente ya está montado
	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as ThemeTypes | null;
		const systemColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
			? ThemeTypes.Dark
			: ThemeTypes.Light;

		const initialTheme = storedTheme ?? systemColorScheme;
		setTheme(initialTheme);
		document.documentElement.setAttribute("data-theme", initialTheme);
	}, []);

	// Guardar cambios de tema
	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) =>
			prev === ThemeTypes.Dark ? ThemeTypes.Light : ThemeTypes.Dark
		);
	};

	return (
		<button
			onClick={toggleTheme}
			className="relative p-1.5 rounded-lg bg-gradient-to-b from-zinc-50 to-zinc-50 dark:from-zinc-800 dark:to-zinc-950/80 hover:from-zinc-100 hover:to-zinc-300/80 dark:hover:from-zinc-700 dark:hover:to-zinc-900/80 shadow-lg hover:shadow-xl active:shadow-inner transition-all duration-300 group border border-zinc-300/50 dark:border-zinc-700/50 backdrop-blur-sm"
			aria-label="Cambiar tema"
		>
			<div className="relative w-6 h-6 overflow-hidden">
				{theme === ThemeTypes.Dark ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6 text-white transform transition-all duration-300 group-hover:text-amber-200"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6 text-yellow-500 transform transition-all duration-300 group-hover:rotate-[360deg] group-hover:text-black"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
						/>
					</svg>
				)}
			</div>
		</button>
	);
}
