import {RefObject, useCallback, useEffect, useMemo, useRef} from "react";
import {Book} from "../helpers/Interfaces";

export const useFiltered = (books: Book[], favorites: string[]) => {
	const filteredBooks = useMemo( () => {
		return [...books].map(item => ({...item, favorite: favorites.indexOf(item.id) !== -1}));
	}, [books, favorites]);
	return filteredBooks;
}

export const useFavorites = (books: Book[], showFavorites: boolean, favorites: string[]) => {

	const filtered = useFiltered( books, favorites );

	const favoriteBooks = useMemo(() => {
		return showFavorites ? filtered.filter( item => item.favorite) : filtered;
	}, [showFavorites, filtered]);

	return favoriteBooks;
}
