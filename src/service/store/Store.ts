import {IStore} from "../helpers/Interfaces";
import { Store } from 'redux';
import Storage, {Constants} from "./Storage";
import RouteReducer from "../reducers";
import { createBrowserHistory } from 'history'
import thunkMiddleware from 'redux-thunk';
import {configureStore} from "@reduxjs/toolkit";

export const history = createBrowserHistory()

export default class AppStore {

	public store: Store;

	constructor() {
		this.store = this.create();
	}

	private create(): Store<IStore, any> {
		const storage = new Storage();
		const persistentState = storage.getItem(Constants.STORE);
		const history = createBrowserHistory();
		const rootReducer = new RouteReducer(history);
		const middlewares = [
			thunkMiddleware
		];

		const store: Store = configureStore(
			{
				reducer: rootReducer.reducer,
				middleware: [...middlewares],
				preloadedState: persistentState ? persistentState : {},
			}
		)
		storage.connect(store);
		return store;
	}

}
