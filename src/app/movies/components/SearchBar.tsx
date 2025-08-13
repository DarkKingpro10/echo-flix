"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

export default function SearchBar({ query }: { query?: string }) {
	const router = useRouter();
	const pathname = usePathname();
	const [searchTerm, setSearchTerm] = useState(query);
	const [debounceSearch] = useDebounce(searchTerm, 500);
	const searchParams = useSearchParams();

	// Actualizar la URL cuando cambie el valor debounced
	useEffect(() => {
		const params = new URLSearchParams(searchParams);
    console.log("Search Params:", params.toString());
		if (debounceSearch && debounceSearch.trim() !== "") {
			params.set("query", debounceSearch);
		} else {
			params.delete("query");
		}

    // Actualizar el historial y la URL
    // Esto asegura que la navegación sea más fluida y no con tirones
    history.pushState(null, "", `?${params.toString()}`);
		router.replace(`${pathname}?${params.toString()}`);
	}, [debounceSearch]);

	// useEffect(() => {
	//   const params = new URLSearchParams(searchParams);
	//   if (debouncedValue) {
	//     params.set("query", debouncedValue);
	//   } else {
	//     params.delete("query");
	//   }

	//   const search = params.toString();
	//   const query = search ? `?${search}` : "";
	//   router.replace(`${pathname}${query}`, { scroll: false });
	// }, [debouncedValue, pathname, router, searchParams]);

	// Manejar cambios en el input
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="relative w-full max-w-md">
			<div className="relative">
				<input
					type="text"
          value={searchTerm}
					onChange={handleSearch}
					placeholder="Buscar películas..."
					className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50 focus:border-transparent transition-all"
				/>
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
			</div>
		</div>
	);
}
