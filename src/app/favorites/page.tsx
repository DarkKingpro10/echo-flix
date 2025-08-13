"use client";

import useFavoriteStore from "../store/favoriteStore";
import useZustandStore from "../store/useStore";

export default function Page() {
	const favorites = useZustandStore(useFavoriteStore, (state) => state.favorites);
  
  return (
		<main className=" min-h-[calc(100dvh_-_80px)] flex flex-col items-center dark:bg-background p-5 bg-zinc-100  text-zinc-900 dark:text-white">
			<h1 className="text-3xl font-bold mb-5 underline decoration-secondary underline-offset-4">
				Catalogo de Favoritos
			</h1>
			<p className="text-lg text-zinc-600 dark:text-zinc-400 mb-5">
				Aquí puedes ver tus películas favoritas. Puedes añadir o eliminar películas de tu lista de favoritos.
			</p>

      {favorites != null && favorites.length > 0 && (
        <h1>Hola</h1>
      )}

		</main>
	);
}
