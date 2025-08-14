export const revalidate = 86400; // revalidar 24 horas para que sea fresca la información

import Image from "next/image";
import { notFound } from "next/navigation";
import { Radio, Star } from "lucide-react";

import BackButton from "@/components/BackButton";
import FavoriteButton from "@/components/FavoriteButton";
import { FavoriteObject } from "@/app/store/favoriteStore";
import { fetchSerieDetail } from "../seriesActions";
import { Metadata } from "next/types";

// Generar metadatos dinámicos para SEO
export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const { data: serie, error } = await fetchSerieDetail(params.id);

	if (error || !serie) {
		return {
			title: "Serie no encontrada",
			description: "No se encontró información sobre esta serie.",
		};
	}

	return {
		title: `${serie.name} | Detalles de la serie`,
		description: serie.overview || "Detalles y reparto de la serie.",
		openGraph: {
			title: `${serie.name} | Detalles de la serie`,
			description: serie.overview || "Detalles y reparto de la serie.",
			images: serie.backdrop_path
				? [`https://image.tmdb.org/t/p/original${serie.backdrop_path}`]
				: [],
		},
	};
}

export default async function SeriesDetail({
	params,
}: {
	params: { id: string };
}) {
	const { data: serie, error } = await fetchSerieDetail(params.id);
	// const router = useRouter();

	if (error || !serie) {
		notFound();
	}

	// Obtenemos los directores y escritores
	const creators = serie.created_by;
	// const cast = serie.aggregate_credits.cast;

	// Función auxiliar para formatear la fecha
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("es-ES", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const favoriteObject: FavoriteObject = {
		type: "movie" as const,
		id: serie.id,
		title: serie.name,
		name: serie.name,
		poster_path: serie.poster_path,
		backdrop_path: serie.backdrop_path,
		overview: serie.overview,
	};

	return (
		<main className="min-h-screen w-full bg-white dark:bg-zinc-900">
			{/* Header con imagen de fondo */}
			<section className="relative h-[40vh] w-full">
				{serie.backdrop_path && (
					<Image
						src={`https://image.tmdb.org/t/p/original${serie.backdrop_path}`}
						alt={serie.name}
						fill
						className="object-cover"
						priority
					/>
				)}
				<div className="absolute inset-0 bg-black/50" />
			</section>

			{/* Contenido principal */}
			<section className="relative z-10 -mt-32 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<BackButton title={"series"} />

					<div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
						{/* Póster */}
						<section className="space-y-2">
							<div className="relative aspect-[2/3] w-full md:max-w-[300px]">
								{serie.poster_path ? (
									<Image
										src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
										alt={serie.name}
										className="rounded-lg object-cover shadow-xl"
										priority
										fill
									/>
								) : (
									<div className="h-full w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
								)}
							</div>
							{serie.status != "Ended" ? (
								<span className="font-bold flex justify-center gap-1.5 text-center text-red-500 animate-pulse">
									En Emision <Radio />
								</span>
							) : (
								<span className="text-center w-full block">Finalizada</span>
							)}
						</section>

						{/* Información */}
						<section className="space-y-6 text-white">
							<div>
								<div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-0">
									<h1 className="text-4xl font-bold  text-white flex-1">
										{serie.name}
									</h1>
									<FavoriteButton object={favoriteObject} />
								</div>
								<div className="mt-2 flex items-center gap-4 flex-wrap mt-1.5 md:mt-0">
									<div className="flex items-center gap-1">
										<Star className="h-5 w-5 text-yellow-400" />
										<span className="text-sm  dark:text-zinc-300">
											{serie.vote_average.toFixed(1)} ({serie.vote_count} votos)
										</span>
									</div>
									<span className="text-sm dark:text-zinc-300">
										{formatDate(serie.first_air_date)}
									</span>
									<span className="text-sm dark:text-zinc-300">
										Temporadas:
										{serie.number_of_seasons}
									</span>
									<span className="text-sm dark:text-zinc-300">
										Episodios:
										{serie.number_of_episodes}
									</span>
								</div>
							</div>

							{/* Géneros */}
							<div className="flex flex-wrap gap-2">
								{serie.genres.map((genre) => (
									<span
										key={genre.id}
										className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:text-secondary dark:bg-secondary/10"
									>
										{genre.name}
									</span>
								))}
							</div>

							{/* Sinopsis */}
							<section aria-labelledby="sinopsis-heading">
								<h2
									id="sinopsis-heading"
									className="text-xl font-semibold text-zinc-900 dark:text-white"
								>
									Sinopsis
								</h2>
								<p className="mt-2 text-zinc-700 dark:text-zinc-300">
									{serie.overview || "No hay sinopsis disponible."}
								</p>
							</section>

							{/* Equipo */}
							<section className="space-y-4">
								{/* Creator */}
								{creators.length > 0 && (
									<div>
										<h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
											Creadores
										</h2>
										<article className="mt-2">
											{creators.map((director) => (
												<span
													key={director.id}
													className="text-zinc-700 dark:text-zinc-300"
												>
													{director.name}
												</span>
											))}
										</article>
									</div>
								)}

								{/* Reparto */}
								{serie.aggregate_credits.cast.length > 0 && (
									<section>
										<h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
											Reparto principal
										</h2>
										<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
											{serie.aggregate_credits.cast.slice(0, 8).map((actor) => (
												<div key={actor.id} className="flex items-center gap-3">
													<article className="relative h-12 w-12 flex-shrink-0">
														{actor.profile_path ? (
															<Image
																src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
																alt={actor.name}
																fill
																className="rounded-full object-cover"
															/>
														) : (
															<div className="h-full w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
														)}
													</article>
													<div>
														<p className="font-medium text-zinc-900 dark:text-white">
															{actor.name}
														</p>
														<p className="text-sm text-zinc-700 dark:text-zinc-300">
															{actor.roles
																? actor.roles[0].character
																: "Desconocido"}
														</p>
													</div>
												</div>
											))}
										</div>
									</section>
								)}
							</section>
						</section>
					</div>
				</div>
			</section>
		</main>
	);
}
