import { use } from "react";
import { fetchMovies, MovieFetchParamsType } from "./moviesActions";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "../config/globalVariables";
import clsx from "clsx";
export default function MoviesList({
	page,
	genres,
	query,
}: MovieFetchParamsType) {
	const data = use(fetchMovies({ page, genres, query }));
	if (data.error) {
		return (
			<main className="flex flex-col items-center justify-center p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
				<h1 className="text-2xl font-bold mb-4">
					Error al cargar las películas
				</h1>
				<p className="text-lg text-red-600 dark:text-red-400">{data.error}</p>
			</main>
		);
	}

	return (
		<main className="min-h-screen flex flex-col items-center justify-center p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
			<h2 className="text-2xl font-bold mb-4">Lista de Películas</h2>
			{/**Sección de peliculas */}
			<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{data.data.map((movie) => (
					<article
						key={movie.id}
						className="bg-white dark:bg-zinc-800 rounded-md shadow-md relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
					>
						<Image
							width={500}
							height={300}
							src={TMDB_IMAGE_BASE_URL + movie.poster_path}
							key={movie.id}
							className="w-full h-[400px] object-cover rounded-t-lg shadow-md"
							alt={movie.title}
							loading="lazy"
							priority={movie.id < 10} // Prioritize loading for the first 10 movies
						/>
						<div className="p-4 flex ">
							<h3 className="text-lg flex-1 font-semibold mb-2 line-clamp-2">
								{movie.title}
							</h3>
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
						</div>
					</article>
					// <div key={movie.id} className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
					// 	<h3 className="text-xl font-semibold">{movie.title}</h3>
					// 	<p className="text-zinc-600 dark:text-zinc-400">{movie.overview}</p>
					// </div>
				))}
			</section>
		</main>
	);
}
