import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";

import { fetchMovieDetails } from "../moviesActions";
import BackButton from "@/components/BackButton";
import FavoriteButton from "@/components/FavoriteButton";
import { FavoriteObject } from "@/app/store/favoriteStore";

export const revalidate = 86400; // revalidar 24 horas para que sea fresca la información

export default async function MovieDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const { data: movie, error } = await fetchMovieDetails(params.id);
	// const router = useRouter();

	if (error || !movie) {
		notFound();
	}

	// Obtenemos los directores y escritores
	const directors = movie.credits.crew.filter(
		(member) => member.job === "Director"
	);
	const writers = movie.credits.crew.filter(
		(member) => member.department === "Writing"
	);

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
		id: movie.id,
		title: movie.title,
		name: movie.title,
		poster_path: movie.poster_path,
		backdrop_path: movie.backdrop_path,
		overview: movie.overview,
	}

	return (
		<main className="min-h-screen w-full bg-white dark:bg-zinc-900">
			{/* Header con imagen de fondo */}
			<div className="relative h-[40vh] w-full">
				{movie.backdrop_path && (
					<Image
						src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
						alt={movie.title}
						fill
						className="object-cover"
						priority
					/>
				)}
				<div className="absolute inset-0 bg-black/50" />
			</div>

			{/* Contenido principal */}
			<div className="relative z-10 -mt-32 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<BackButton title={"películas"} />

					<div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
						{/* Póster */}
						<div className="relative aspect-[2/3] w-full md:max-w-[300px]">
							{movie.poster_path ? (
								<Image
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									fill
									className="rounded-lg object-cover shadow-xl"
									priority
								/>
							) : (
								<div className="h-full w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
							)}
						</div>

						{/* Información */}
						<div className="space-y-6 text-white">
							<div>
								<div className="flex flex-col md:flex-row flex-wrap">
									<h1 className="text-4xl font-bold  text-white flex-1">
										{movie.title}
									</h1>
									<FavoriteButton object={favoriteObject} />
								</div>
								<div className="mt-2 flex items-center gap-4">
									<div className="flex items-center gap-1">
										<Star className="h-5 w-5 text-yellow-400" />
										<span className="text-sm  dark:text-zinc-300">
											{movie.vote_average.toFixed(1)} ({movie.vote_count} votos)
										</span>
									</div>
									<span className="text-sm dark:text-zinc-300">
										{formatDate(movie.release_date)}
									</span>
									<span className="text-sm dark:text-zinc-300">
										{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
									</span>
								</div>
							</div>

							{/* Géneros */}
							<div className="flex flex-wrap gap-2">
								{movie.genres.map((genre) => (
									<span
										key={genre.id}
										className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:text-secondary dark:bg-secondary/10"
									>
										{genre.name}
									</span>
								))}
							</div>

							{/* Sinopsis */}
							<div>
								<h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
									Sinopsis
								</h2>
								<p className="mt-2 text-zinc-700 dark:text-zinc-300">
									{movie.overview || "No hay sinopsis disponible."}
								</p>
							</div>

							{/* Equipo */}
							<div className="space-y-4">
								{/* Directores */}
								{directors.length > 0 && (
									<div>
										<h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
											{directors.length > 1 ? "Directores" : "Director"}
										</h2>
										<div className="mt-2">
											{directors.map((director) => (
												<span
													key={director.id}
													className="text-zinc-700 dark:text-zinc-300"
												>
													{director.name}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Escritores */}
								{writers.length > 0 && (
									<div>
										<h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
											Guion
										</h2>
										<div className="mt-2">
											{writers.map((writer, index) => (
												<span
													key={writer.id}
													className="text-zinc-700 dark:text-zinc-300"
												>
													{writer.name}
													{index < writers.length - 1 ? ", " : ""}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Reparto */}
								{movie.credits.cast.length > 0 && (
									<div>
										<h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
											Reparto principal
										</h2>
										<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
											{movie.credits.cast.slice(0, 8).map((actor) => (
												<div key={actor.id} className="flex items-center gap-3">
													<div className="relative h-12 w-12 flex-shrink-0">
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
													</div>
													<div>
														<p className="font-medium text-zinc-900 dark:text-white">
															{actor.name}
														</p>
														<p className="text-sm text-zinc-700 dark:text-zinc-300">
															{actor.character}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
