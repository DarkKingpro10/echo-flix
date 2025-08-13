import { Suspense } from "react";
import MoviesList from "./movies/MoviesList";

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
		genres?: string[];
	}>;
}) {
	const searchParams = await props.searchParams;

	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const genresRaw = searchParams?.genres;
	const genres = Array.isArray(genresRaw)
		? genresRaw
		: genresRaw
		? [genresRaw]
		: [];

	return (
		<main className=" min-h-[calc(100dvh_-_80px)] flex flex-col items-center dark:bg-background p-5 bg-zinc-100  text-zinc-900 dark:text-white">
			<h1 className="text-3xl font-bold mb-5 underline decoration-secondary underline-offset-4">
				Catalogo de Películas
			</h1>

			<p className="text-lg text-zinc-600 dark:text-zinc-400 mb-5">
				Explora nuestra colección de películas. Puedes buscar por título,
				filtrar por géneros o simplemente navega por la página para descubrir
        nuevas películas.
			</p>
      <Suspense fallback={<div>Cargando películas...</div>}>
        <MoviesList page={currentPage} genres={genres} query={query} />
      </Suspense>
		</main>
	);
}
