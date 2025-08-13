"use client";

import useFavoriteStore, { FavoriteObject } from "@/app/store/favoriteStore";
import useZustandStore from "@/app/store/useStore";
import { Heart, HeartCrack } from "lucide-react";

export default function FavoriteButton({ object }: { object: FavoriteObject }) {
	// Obtenemos del hook de Zustand personalizado para evitar problemas de rehidratación si el id es favorito
	const isFavorite = useZustandStore(useFavoriteStore, (state) =>
		state.isFavorite(object.id)
	);

  console.log("isFavorite", isFavorite);

	// Accedemos a las funciones atravez del hook de Zustand
	const addFavorite = useFavoriteStore((state) => state.addFavorite);
	const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavorite(object.id);
		} else {
			addFavorite(object);
		}
	};

	return (
		<button
			type="button"
			onClick={toggleFavorite}
			className="flex items-center gap-2 border-zinc-400 cursor-pointer border-2 rounded px-2 hover:bg-secondary dark:hover:bg-zinc-700 transition-colors duration-300"
		>
			{isFavorite ? (
				<>
					<HeartCrack className="text-red-500" />
					<span>Eliminar de favoritos</span>
				</>
			) : (
				<>
					<Heart />
					<span>Agregar a favoritos</span>
				</>
			)}
		</button>
	);
}
