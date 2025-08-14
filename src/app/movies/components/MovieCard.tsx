import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/config/globalVariables";
import clsx from "clsx";
import { Movie } from "../moviesTypes";
/**
 * Componente MovieCard que muestra la información de una película.
 * @param {Movie} movie - Objeto de tipo Movie que contiene los detalles de la película.
 * @returns JSX.Element - Renderiza una tarjeta con la información de la película.
 */
export default function MovieCard({ movie }: { movie: Movie }) {
	return (
		<article
			key={movie.id}
			className="relative group bg-white dark:bg-zinc-800 rounded-md shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
		>
			{/* Overlay al hacer hover */}
			<Link
				href={`/movies/${movie.id}`}
				className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
			>
				<Eye className="w-10 h-10 text-white hover:text-gray-500 transition-colors" />
			</Link>
			<Image
				width={500}
				height={300}
				src={TMDB_IMAGE_BASE_URL + movie.poster_path}
				key={movie.id}
				className="w-full h-[400px] object-cover rounded-t-lg shadow-md"
				alt={movie.title}
				loading="lazy"
			/>
			<footer className="p-4 flex ">
				{/** Titulo de la pelicula*/}
				<h3 className="text-lg flex-1 font-semibold mb-2 line-clamp-2">
					{movie.title}
				</h3>
				{/** Rating de la pelicula */}
				<div className="flex items-center gap-2 text-sm">
					<span
						className={clsx(
							"min-w-[2.5rem] h-8 flex items-center justify-center rounded-full font-semibold text-sm",
							{
								"text-red-600 bg-red-100": movie.vote_average < 5,
								"text-yellow-600 bg-yellow-100":
									movie.vote_average >= 5 && movie.vote_average < 8,
								"text-green-600 bg-green-100": movie.vote_average >= 8,
							}
						)}
					>
						{movie.vote_average.toFixed(1)}
					</span>
				</div>
			</footer>
		</article>
	);
}
