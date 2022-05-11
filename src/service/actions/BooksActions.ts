import { Action } from 'redux';
import {Book, ISearchPayload} from "../helpers/Interfaces";

export enum EBooksActions {
	RESET = 'books/RESET',
	SEARCH = 'books/SEARCH',
	LOAD_COMPLETE = 'books/LOAD_COMPLETE',
	LOAD_ERROR = 'books/LOAD_ERROR',
	TOTAL = 'books/TOTAL',
	TOGGLE_FAVORITE = 'books/TOGGLE_FAVORITE',
	TOGGLE_SHOW_FAVORITES = 'books/TOGGLE_SHOW_FAVORITES'
}

export interface IBooksAction<T> extends Action<any> {
	type: EBooksActions,
	payload?: T
}

export default class BooksActions {

	public reset(): IBooksAction<any> {
		return {
			type: EBooksActions.RESET
		} as IBooksAction<any>
	}
	public search(payload: ISearchPayload): IBooksAction<ISearchPayload> {
		return {
			type: EBooksActions.SEARCH,
			payload: payload
		} as IBooksAction<ISearchPayload>
	}
	public loadComplete(payload: Book[]): IBooksAction<Book[]> {
		return {
			type: EBooksActions.LOAD_COMPLETE,
			payload: payload
		} as IBooksAction<Book[]>
	}
	public loadError(payload: any): IBooksAction<any> {
		return {
			type: EBooksActions.LOAD_ERROR,
			payload: payload
		} as IBooksAction<any>
	}
	public totalBooks(payload: number): IBooksAction<number> {
		return {
			type: EBooksActions.TOTAL,
			payload: payload
		} as IBooksAction<number>
	}
	public toggleFavorite(payload: string): IBooksAction<string> {
		return {
			type: EBooksActions.TOGGLE_FAVORITE,
			payload: payload
		} as IBooksAction<string>
	}
	public toggleShowFavorite(): IBooksAction<any> {
		return {
			type: EBooksActions.TOGGLE_SHOW_FAVORITES,
		} as IBooksAction<any>
	}

}
