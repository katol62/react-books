import {Store} from "redux";

export interface ISearchPayload {
	q?: any,
	startIndex?: any,
	maxResults?: any
}

export interface Book {
	id: string;
	volumeInfo?: {
		title: string;
		subtitle: string;
	},
	favorite?: boolean;
}

export interface BooksResult {
	items: Book[],
	kind: string;
	totalItems: number;
}
export interface IBooksState {
	loading: boolean,
	showFavorites: boolean,
	error: any,
	books: Book[],
	favourites: string[],
	total: number
}

export interface IStore extends Store<IStore> {
	books: IBooksState;
}
