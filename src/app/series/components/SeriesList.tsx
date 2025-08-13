"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { SeriesFetchResponseType, fetchSeries } from "../seriesActions";

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
	useInfiniteQuery({
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
	return <></>;
}
