export default function SeriesPage() {
	return (
		<main className=" min-h-[calc(100dvh_-_80px)] flex flex-col items-center dark:bg-background p-5 bg-zinc-100  text-zinc-900 dark:text-white">
			<h1 className="text-3xl font-bold mb-5 underline decoration-secondary underline-offset-4">
				Catalogo de Series
			</h1>
			<p className="text-lg text-zinc-600 dark:text-zinc-400 mb-5">
				Explora nuestra colección de series. Puedes buscar por título,
				filtrar por géneros o simplemente navega por la página para descubrir
				nuevas películas.
			</p>
			<p className="text-sm text-center text-zinc-700 dark:text-zinc-400 ">
				Esta página usa infinity scroll, maneja cache con TansTack Query
			</p>
      
		</main>
	);
}
