"use client";

import Link from "next/link";
import useFavoriteStore from "../store/favoriteStore";
import useZustandStore from "../store/useStore";
import Image from "next/image";
import { Eye } from "lucide-react";
import { TMDB_IMAGE_BASE_URL } from "@/config/globalVariables";
import FavoriteButton from "@/components/FavoriteButton";

export default function Page() {
	const favorites = useZustandStore(
		useFavoriteStore,
		(state) => state.favorites
	);

	return (
		<main className=" min-h-[calc(100dvh_-_80px)] flex flex-col items-center dark:bg-background p-5 bg-zinc-100  text-zinc-900 dark:text-white">
			<h1 className="text-3xl font-bold mb-5 underline decoration-secondary underline-offset-4">
				Catalogo de Favoritos
			</h1>
			<p className="text-lg text-zinc-600 dark:text-zinc-400 mb-5">
				Aquí puedes ver tus películas favoritas. Puedes añadir o eliminar
				películas de tu lista de favoritos.
			</p>

			{favorites != null && favorites.length > 0 && (
				<section className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{favorites.map((favorite, index) => (
						<article
							key={favorite.id}
							className="relative group bg-white dark:bg-zinc-800 rounded-md shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
						>
							{/* Overlay al hacer hover */}
							<Link
								href={`/${favorite.type}s/${favorite.id}`}
								className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
							>
								<Eye className="w-10 h-10 text-white hover:text-gray-500 transition-colors" />
							</Link>
							<Image
								width={500}
								height={300}
								src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`}
								key={favorite.id}
								className="w-full h-[400px] object-cover rounded-t-lg shadow-md"
								alt={favorite.title}
								loading="lazy"
							/>
							<div className="p-4 flex ">
								{/** Titulo de la pelicula*/}
								<h3 className="text-lg flex-1 font-semibold mb-2 line-clamp-2">
									{favorite.title}
								</h3>
                <span>Tipo: {favorite.type == "movie" ? "Película": "serie"}</span>
							</div>
						</article>
					))}
				</section>
			)}
		</main>
	);
}
