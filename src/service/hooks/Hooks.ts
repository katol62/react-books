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

export const useObserver = ( ref: RefObject<any>, canLoad: boolean, isLoading: boolean, callback: any) => {
	const observer = useRef<IntersectionObserver | null>(null);

	const handleObserver = useCallback((entries: any) => {
		const [target] = entries;
		if (entries[0].isIntersecting && canLoad) {
			callback()
		}
	}, []);

	useEffect(() => {
		if(isLoading) return;
		if(observer.current) observer.current.disconnect();

		const cb = (entries: any) => {
			if (entries[0].isIntersecting && canLoad) {
				callback()
			}
		};
		observer.current = new IntersectionObserver(cb);
		if (ref.current) observer.current.observe(ref.current)
	}, [isLoading])
}

// export const useInfiniteScroll = () => {
// 	const loadMoreRef = useRef(null);
//
// 	const handleObserver = useCallback((entries: any) => {
// 		const [target] = entries;
// 		if (target.isIntersecting) {
// 			ca
// 		}
// 	}, []);
//
// 	useEffect(() => {
// 		const option = {
// 			root: null,
// 			rootMargin: '0px',
// 			threshold: 1.0,
// 		};
//
// 		const observer = new IntersectionObserver(handleObserver, option);
//
// 		if (loadMoreRef.current) observer.observe(loadMoreRef.current);
// 	}, [handleObserver]);
//
// 	return { loadMoreRef };
// }
