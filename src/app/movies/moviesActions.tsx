"use server";

import z from "zod";
import { Movie } from "./moviesTypes";
import { Genre } from "@/types/genresTypes";

const MovieFetchParamsSchema = z.object({
	query: z.string().optional(),
	page: z.number().default(1),
	genres: z
		.array(z.union([z.string(), z.number()]))
		.default([])
		.optional(),
});

export type MovieFetchParamsType = z.infer<typeof MovieFetchParamsSchema>;

export async function fetchMovies(searchParams: MovieFetchParamsType): Promise<{
	error: string | null;
	details: unknown | null;
	data: Movie[];
	page?: number;
	totalPages?: number;
	totalResults?: number;
}> {
	// Validación de los parámetros de búsqueda
	const { success, error, data } =
		MovieFetchParamsSchema.safeParse(searchParams);

	if (!success) {
		return {
			error: "No se pudieron validar los parámetros de búsqueda.",
			details: error.issues,
			data: [],
		};
	}

	// Construcción de la URL de búsqueda
	const baseUrl = "https://api.themoviedb.org/3/discover/movie";
	const { query, page, genres } = data;

	const url = new URL(baseUrl); // Construimos la URL base
	// Añadimos los parámetros de búsqueda
	url.searchParams.append("api_key", process.env.TMDB_API_KEY || "");
	url.searchParams.append("page", page.toString());
	url.searchParams.append("language", "es-ES");

	// Si hay una consulta de búsqueda, la añadimos a los parámetros
	if (query) {
		url.searchParams.append("query", query);
	}
	// Si hay géneros, los añadimos a los parámetros
	if (genres && genres.length > 0) {
		url.searchParams.append("with_genres", genres.join(","));
	}

	// Realizamos la solicitud a la API
	try {
		const response = await fetch(url.toString(), {
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		// Verificamos si la respuesta es exitosa
		if (!response.ok) {
			return {
				error: "Error al obtener los datos de la API.",
				details: data.status_message || "Error desconocido",
				data: [],
			};
		}
		// Retornamos los datos obtenidos
		return {
			error: null,
			details: null,
			data: data.results || [],
			page: data.page || 1,
			totalPages: data.total_pages || 1,
			totalResults: data.total_results || 0,
		};
	} catch (error) {
		return {
			error: "Error al realizar la solicitud a la API.",
			details: error instanceof Error ? error.message : "Error desconocido",
			data: [],
		};
	}
}

export async function fetchMovieGenres(): Promise<{
	error: string | null;
	details: unknown | null;
	data: Genre[];
}> {
	const url = new URL("https://api.themoviedb.org/3/genre/movie/list");
	url.searchParams.append("api_key", process.env.TMDB_API_KEY || "");
	url.searchParams.append("language", "es-ES");

	try {
		const response = await fetch(url.toString(), {
			next: { revalidate: 86400 }, // Revalida cada 24 horas
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				error: "Error al obtener los géneros de la API.",
				details: data.status_message || "Error desconocido",
				data: [],
			};
		}

		return {
			error: null,
			details: null,
			data: data.genres || [],
		};
	} catch (error) {
		return {
			error: "Error al realizar la solicitud a la API.",
			details: error instanceof Error ? error.message : "Error desconocido",
			data: [],
		};
	}
}
