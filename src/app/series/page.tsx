export const dynamic = "force-dynamic"; // Para que siempre se muestre la información mas actual y permitir a tanstack manejarlo

import { Suspense } from "react";
import SeriesList from "./components/SeriesList";
import { fetchSeries, fetchSeriesGenre } from "./seriesActions";
import CardSkeleton from "@/components/layout/CardSkeleton";
import SearchBar from "../movies/components/SearchBar";
import CategoryFilter from "../movies/components/CategoryFilter";


export default async function SeriesPage(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
		genres?: string[];
	}>;
}) {
	// Obtenemos los parametros de la URL
	const searchParams = await props.searchParams;
	const query = searchParams?.query ?? "";
	const currentPage = Number(searchParams?.page ?? 1);
	const genresRaw = searchParams?.genres;
	const genres = Array.isArray(genresRaw)
		? genresRaw
		: genresRaw
		? [genresRaw]
		: [];

	const response = await fetchSeries({
		page: currentPage,
		genres,
		query,
	});

	return (
		<main className=" min-h-[calc(100dvh_-_80px)] flex flex-col items-center dark:bg-background p-5 bg-zinc-100  text-zinc-900 dark:text-white">
			<h1 className="text-3xl font-bold mb-5 underline decoration-secondary underline-offset-4">
				Catalogo de Series
			</h1>
			<p className="text-lg text-zinc-600 dark:text-zinc-400 mb-5">
				Explora nuestra colección de series. Puedes buscar por título, filtrar
				por géneros o simplemente navega por la página para descubrir nuevas
				películas.
			</p>
			<p className="text-sm text-center text-zinc-700 dark:text-zinc-400 ">
				Esta página usa infinity scroll, maneja cache con TansTack Query
			</p>

			<div className="w-full max-w-7xl mx-auto mb-8 space-y-6">
				<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
					<h2 className="text-2xl font-bold">Lista de Series</h2>
					<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
						{/* Aquí van a ir los search y categorias*/}
						<SearchBar query={query} />
						<CategoryFilter fetchCallback={fetchSeriesGenre} />
					</div>
				</div>

				{response.error && (
					<section className="flex flex-col items-center justify-center p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
						<h1 className="text-2xl font-bold mb-4">
							Error al cargar las series
						</h1>
						<p className="text-lg text-red-600 dark:text-red-400">
							{response.error}
						</p>
					</section>
				)}

				{!response.error && (
					<Suspense fallback={<CardSkeleton cantidad={10} />}>
						<SeriesList
							initialData={response}
							page={currentPage}
							genres={genres}
							query={query}
						/>
					</Suspense>
				)}
			</div>
		</main>
	);
}
