import { use } from "react";
import { fetchMovies, MovieFetchParamsType } from "../moviesActions";
import Pagination from "@/components/Pagination";
import MovieCard from "./MovieCard";
export default function MoviesList({
	page,
	genres,
	query,
}: MovieFetchParamsType) {
	const movieData = use(fetchMovies({ page, genres, query }));

	if (movieData.error) {
		return (
			<section className="flex flex-col items-center justify-center p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
				<h1 className="text-2xl font-bold mb-4">
					Error al cargar las películas
				</h1>
				<p className="text-lg text-red-600 dark:text-red-400">
					{movieData.error}
				</p>
			</section>
		);
	}

	if (!movieData.data || movieData.data.length === 0) {
		return (
			<section className="flex flex-col items-center justify-center p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
				<h1 className="text-2xl font-bold mb-4">No se encontraron películas</h1>
				<p className="text-lg text-zinc-600 dark:text-zinc-400">
					Intenta ajustar tus filtros o buscar con otro término.
				</p>
			</section>
		);
	}

	return (
		<section className="min-h-screen flex flex-col p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
			{/**Sección de peliculas */}
			<section className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{movieData.data.map((movie) => (
					// <article
					// 	key={movie.id}
					// 	className="relative group bg-white dark:bg-zinc-800 rounded-md shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
					// >
					// 	{/* Overlay al hacer hover */}
					// 	<Link
					// 		href={`/movies/${movie.id}`}
					// 		className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
					// 	>
					// 		<Eye className="w-10 h-10 text-white hover:text-gray-500 transition-colors" />
					// 	</Link>
					// 	<Image
					// 		width={500}
					// 		height={300}
					// 		src={TMDB_IMAGE_BASE_URL + movie.poster_path}
					// 		key={movie.id}
					// 		className="w-full h-[400px] object-cover rounded-t-lg shadow-md"
					// 		alt={movie.title}
					// 		loading="lazy"
					// 		priority={movie.id < 10} // Priorizar las primeras 10 películas
					// 	/>
					// 	<div className="p-4 flex ">
					// 		{/** Titulo de la pelicula*/}
					// 		<h3 className="text-lg flex-1 font-semibold mb-2 line-clamp-2">
					// 			{movie.title}
					// 		</h3>
					// 		{/** Rating de la pelicula */}
					// 		<div className="flex items-center gap-2 text-sm">
					// 			<span
					// 				className={clsx(
					// 					"min-w-[2.5rem] h-8 flex items-center justify-center rounded-full font-semibold text-sm",
					// 					{
					// 						"text-red-600 bg-red-100": movie.vote_average < 5,
					// 						"text-yellow-600 bg-yellow-100":
					// 							movie.vote_average >= 5 && movie.vote_average < 8,
					// 						"text-green-600 bg-green-100": movie.vote_average >= 8,
					// 					}
					// 				)}
					// 			>
					// 				{movie.vote_average.toFixed(1)}
					// 			</span>
					// 		</div>
					// 	</div>
					// </article>
					<MovieCard movie={movie} key={movie.id} />
				))}
			</section>
			<div className="w-full">
				{movieData.totalPages && movieData.totalResults && (
					<Pagination
						path="/movies"
						currentPage={page}
						totalPages={movieData.totalPages}
						totalResults={movieData.totalResults}
					/>
				)}
			</div>
		</section>
	);
}
