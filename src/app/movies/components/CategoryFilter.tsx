"use client";

import { Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchMovieGenres } from "../moviesActions";

interface Category {
	id: number;
	name: string;
}

export default function CategoryFilter() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isOpen, setIsOpen] = useState(false);
	const filterRef = useRef<HTMLDivElement>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Obtener los géneros de la URL
	const genresParam = searchParams.get("genres");
	const selectedIds = genresParam ? genresParam.split(",").map(Number) : [];

	// Fetch de las categorías
	useEffect(() => {
		const fetchCategories = async () => {
			try {
        const response = await fetchMovieGenres();
				if (response.error) {
					console.error("Error al cargar las categorias:", response.details);
				}
				setCategories(response.data || []);
			} catch (error) {
				console.error("Error al cargar las categorias:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, []);

	// Convertir los géneros seleccionados de la URL a números
	// const selectedCategories = selectedGenres ? selectedGenres.split(",").map(Number) : [];

	// Cerrar el menú al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				filterRef.current &&
				!filterRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Manejar la selección/deselección de categorías
	const handleCategoryToggle = (categoryId: number) => {
		const newCategories = selectedIds.includes(categoryId)
			? selectedIds.filter((id: number) => id !== categoryId)
			: [...selectedIds, categoryId];

		// Actualizar la URL
		const params = new URLSearchParams(searchParams);
		if (newCategories.length > 0) {
			params.set("genres", newCategories.join(","));
		} else {
			params.delete("genres");
		}
		router.push(`${pathname}?${params.toString()}`);
	};

	if (isLoading) {
		return (
			<button
				disabled
				className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg"
			>
				<Filter className="w-5 h-5 animate-pulse" />
				<span>Cargando categorías...</span>
			</button>
		);
	}

	return (
		<div className="relative" ref={filterRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
			>
				<Filter className="w-5 h-5" />
				<span>
					Géneros {selectedIds.length > 0 && `(${selectedIds.length})`}
				</span>
			</button>

			{/* Lista de categorías */}
			{isOpen && (
				<div className="absolute top-full mt-2 right-0 w-64 max-h-96 overflow-y-auto bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50">
					<div className="p-2 space-y-1">
						{categories.map((category) => (
							<label
								key={category.id}
								className="flex items-center gap-2 p-2 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 rounded cursor-pointer"
							>
								<input
									type="checkbox"
									checked={selectedIds.includes(category.id)}
									onChange={() => handleCategoryToggle(category.id)}
									className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-primary focus:ring-primary"
								/>
								<span>{category.name}</span>
							</label>
						))}
					</div>
				</div>
			)}

			{/* Pills de categorías seleccionadas */}
			{/* {selectedIds.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{selectedIds.map((id: number) => {
						const category = categories.find((c) => c.id === id);
						if (!category) return null;
						return (
							<span
								key={id}
								className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
							>
								{category.name}
								<button
									onClick={() => handleCategoryToggle(id)}
									className="hover:text-primary/80"
								>
									×
								</button>
							</span>
						);
					})}
				</div>
			)} */}
		</div>
	);
}
