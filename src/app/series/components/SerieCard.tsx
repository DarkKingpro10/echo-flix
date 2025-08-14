import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/config/globalVariables";
import clsx from "clsx";
import { Serie } from "../seriesType";

/**
 * Componente SerieCard que muestra la información de una serie.
 * @param {Movie} movie - Objeto de tipo Movie que contiene los detalles de la serie.
 * @returns JSX.Element - Renderiza una tarjeta con la información de la serie.
 */
export default function SerieCard({ serie }: { serie: Serie }) {
	return (
		<article
			key={serie.id}
			className="relative group bg-white dark:bg-zinc-800 rounded-md shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
		>
			{/* Overlay al hacer hover */}
			<Link
				href={`/series/${serie.id}`}
				className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
			>
				<Eye className="w-10 h-10 text-white hover:text-gray-500 transition-colors" />
			</Link>
			<Image
				width={500}
				height={300}
				src={'https://image.tmdb.org/t/p/w500' + serie.poster_path}
				key={serie.id}
				className="w-full h-[400px] object-cover rounded-t-lg shadow-md"
				alt={serie.name}
				loading="lazy"
			/>
			<div className="p-4 flex ">
				{/** Titulo de la pelicula*/}
				<h3 className="text-lg flex-1 font-semibold mb-2 line-clamp-2">
					{serie.name}
				</h3>
				{/** Rating de la pelicula */}
				<div className="flex items-center gap-2 text-sm">
					<span
						className={clsx(
							"min-w-[2.5rem] h-8 flex items-center justify-center rounded-full font-semibold text-sm",
							{
								"text-red-600 bg-red-100": serie.vote_average < 5,
								"text-yellow-600 bg-yellow-100":
									serie.vote_average >= 5 && serie.vote_average < 8,
								"text-green-600 bg-green-100": serie.vote_average >= 8,
							}
						)}
					>
						{serie.vote_average.toFixed(1)}
					</span>
				</div>
			</div>
		</article>
	);
}
