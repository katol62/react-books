import {History} from 'history';
import { combineReducers, Reducer, CombinedState } from 'redux'
import {IBooksState} from "../helpers/Interfaces";
import BooksReducer from "./BooksReducer";

export default class RouteReducer {
	constructor(public history: History) {
		this.history = history;
	}

	public get reducer(): Reducer<CombinedState<{ books: IBooksState }>> {
		return combineReducers({
			books: BooksReducer.reducer
		});
	}
}
