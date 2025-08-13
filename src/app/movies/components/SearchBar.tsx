"use client";

import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ query }: { query?: string }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isSearching, setIsSearching] = useState(false);
	const [searchTerm, setSearchTerm] = useState(query || "");

	// Manejar la búsqueda
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (isSearching) return;
		
		setIsSearching(true);
		
		const trimmedSearch = searchTerm?.trim() || "";
		const params = new URLSearchParams(searchParams.toString());
		
		if (trimmedSearch) {
			params.set("query", trimmedSearch);
		} else {
			params.delete("query");
		}
		
		router.push(`${pathname}?${params.toString()}`);
		// Dar un pequeño tiempo para que se complete la navegación
		setTimeout(() => setIsSearching(false), 500);
	};

	// Manejar cambios en el input
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className="relative w-full max-w-md">
			<div className="relative flex items-center gap-2">
				<div className="relative flex-1">
					<input
						type="text"
						value={searchTerm}
						onChange={handleSearch}
						placeholder="Buscar películas..."
						disabled={isSearching}
						className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50 focus:border-transparent transition-all disabled:opacity-50"
					/>
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
				</div>
				<button
					type="submit"
					disabled={isSearching}
					className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[100px] justify-center"
				>
					{isSearching ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							<span>Buscando...</span>
						</>
					) : (
						<span>Buscar</span>
					)}
				</button>
			</div>
		</form>
	);
}
