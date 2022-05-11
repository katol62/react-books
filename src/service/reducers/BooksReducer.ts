import {IBooksState} from "../helpers/Interfaces";
import {EBooksActions, IBooksAction} from "../actions/BooksActions";

export const initialBooksState: IBooksState = {
	loading: false,
	books: [],
	favourites: [],
	error: null,
	showFavorites: false,
	total: 0
}

export default class BooksReducer {

	public static reducer(state: IBooksState = initialBooksState, action: IBooksAction<any>): IBooksState {
		switch (action.type) {
			case EBooksActions.RESET: {
				const favourites = [...state.favourites];
				return {
					...initialBooksState,
					favourites
				}
			}
			case EBooksActions.SEARCH: {
				return {
					...state,
					error: null,
					loading: true
				}
			}
			case EBooksActions.LOAD_COMPLETE: {
				const payload = action.payload ? action.payload : [];
				const books = [...state.books, ...payload]
				return {
					...state,
					error: null,
					loading: false,
					books
				}
			}
			case EBooksActions.LOAD_ERROR: {
				const error = action.payload;
				return {
					...state,
					error,
					loading: false
				}
			}
			case EBooksActions.TOTAL: {
				const total = action.payload ? action.payload : 0;
				return {
					...state,
					total
				}
			}
			case EBooksActions.TOGGLE_FAVORITE: {
				const favourites = [...state.favourites];
				const index = favourites.indexOf(action.payload);
				if (index !== -1) {
					favourites.splice(index, 1);
				} else {
					favourites.push(action.payload)
				}
				return {
					...state,
					favourites
				}
			}
			case EBooksActions.TOGGLE_SHOW_FAVORITES: {
				const showFavorites = !{...state}.showFavorites;
				return {
					...state,
					loading: false,
					showFavorites
				}
			}
			default: return state
		}
	}
}
