"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { SeriesFetchResponseType, fetchSeries } from "../seriesActions";
import SerieCard from "./SerieCard";

type SeriesListProps = {
	initialData: SeriesFetchResponseType;
	page: number;
	genres?: string[];
	query?: string;
};

export default function SeriesList({
	initialData,
	page,
	genres,
	query,
}: SeriesListProps) {
	const {
		data,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		status,
		error,
	} = useInfiniteQuery({
		queryKey: ["series"],
		queryFn: ({ pageParam = 1 }) =>
			fetchSeries({ page: pageParam, genres, query }),
		initialPageParam: page,
		getNextPageParam: (lastPage) => {
			if (
				typeof lastPage.page === "number" &&
				typeof lastPage.totalPages === "number" &&
				lastPage.page < lastPage.totalPages
			) {
				return lastPage.page + 1;
			}
			return undefined;
		},
		initialData: {
			pageParams: [page],
			pages: [initialData],
		},
	});

	if (initialData.data.length < 1) {
		return (
			<section className="flex flex-col items-center justify-center p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
				<h1 className="text-2xl font-bold mb-4">No se encontraron series</h1>
				<p className="text-lg text-zinc-600 dark:text-zinc-400">
					Intenta ajustar tus filtros o buscar con otro término.
				</p>
			</section>
		);
	}

	return (
		<section className="min-h-screen flex flex-col p-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white">
			<section className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{data.pages.map((page) =>
					page.data.map((serie) => <SerieCard key={serie.id} serie={serie} />)
				)}
			</section>
		</section>
	);
}
