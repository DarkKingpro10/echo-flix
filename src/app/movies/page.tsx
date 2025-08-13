import { Suspense } from "react";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import MoviesList from "./components/MoviesList";

// Marcar la ruta como dinámica
// export const dynamic = "force-dynamic"; // Mejor no para que la primera carga sea más rápida
// Opcionalmente, podemos configurar el revalidate si queremos cache por un tiempo específico
export const revalidate = 86400; // revalidar 24 horas para que sea fresca la información

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
			<p className="text-sm text-center text-zinc-700 dark:text-zinc-400 ">Esta página usa paginado por medio de botones, ISR por parte de Next JS, usa cache para que el primer cargado sea rápido pero posterior a ello, puede usarse con filtros y búsqueda actualizando la información. De manera nativa de Next Js</p>
			{/* Encabezado y filtros */}
			<div className="w-full max-w-7xl mx-auto mb-8 space-y-6">
				<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
					<h2 className="text-2xl font-bold">Lista de Películas</h2>
					<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
						<SearchBar query={query}/>
						<CategoryFilter />
					</div>
				</div>
			</div>
			<Suspense key={`${query}-${currentPage}-${genres.join()}`} fallback={
				<div className="w-full max-w-7xl mx-auto">
					<div className="animate-pulse space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{[...Array(8)].map((_, i) => (
								<div key={i} className="bg-zinc-200 dark:bg-zinc-800 rounded-lg h-[400px]" />
							))}
						</div>
					</div>
				</div>
			}>
				<MoviesList page={currentPage} genres={genres} query={query} />
			</Suspense>
		</main>
	);
}
