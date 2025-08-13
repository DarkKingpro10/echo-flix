import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteObject = {
	type: "movie" | "serie";
	id: number;
	title: string;
	name: string;
	poster_path: string | null;
	backdrop_path: string | null;
	overview?: string;
};

type FavoriteStore = {
	favorites: FavoriteObject[];
	addFavorite: (object: FavoriteObject) => void;
	removeFavorite: (id: number) => void;
	isFavorite: (id: number) => boolean;
};

const useFavoriteStore = create<FavoriteStore>()(
	persist(
		(set, get) => ({
			favorites: [],
			addFavorite: (object) =>
				set((state) => {
					const existingFavorites = get().favorites;
					const exists = existingFavorites.some(
						(fav) => fav.id === object.id
					);
					if (exists) return state;
					return {
						favorites: [...state.favorites, object],
					};
				}),
			removeFavorite: (id) =>
				set((state) => ({
					favorites: state.favorites.filter((fav) => fav.id !== id),
				})),
			isFavorite: (id) => get().favorites.some((fav) => fav.id === id),
		}),
		{
			name: "favorite-movies-storage",
		}
	)
);

export default useFavoriteStore;
