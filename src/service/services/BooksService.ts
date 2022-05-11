import HTTPClient from "./HTTPClient";
import {Book, ISearchPayload} from "../helpers/Interfaces";
import {useDispatch} from "react-redux";
import BooksActions from "../actions/BooksActions";

export default class BooksService {

	private static _instance: BooksService;

	private key = 'AIzaSyDorwKcoAq4X6LrWU5ojreQVKA6EOdqETw';
	private API_PATH = `https://www.googleapis.com/books/v1/volumes`;
	private dispatch = useDispatch();
	private http: HTTPClient;
	private bookActions = new BooksActions();

	constructor() {
		this.http = new HTTPClient(this.API_PATH);
	}

	public static get instance(): BooksService {
		if (!this._instance) {
			this._instance = new BooksService();
		}
		return this._instance;
	}

	public async getBooks(params: ISearchPayload): Promise<any> {
		const p = params.q && params.q !== '' ? {...params} : {startIndex: params.startIndex, maxResults: params.maxResults, p: ' '};
		this.dispatch(this.bookActions.search(p));
		const opt = {payload: {...p, key: this.key}};
		const response = await this.http.GET('', opt);
		if (response.data.error) {
			this.dispatch(this.bookActions.loadError(response.data.error));
		} else {
			const books = response.data.items && response.data.items.length ? response.data.items.map((item: Book) => ({...item, favorite: false})) : [];
			const total = response.data.totalItems;
			this.dispatch(this.bookActions.loadComplete(books));
			this.dispatch(this.bookActions.totalBooks(total));
		}
		return response
	}

	public reset(): void {
		this.dispatch(this.bookActions.reset());
	}
	public toggleFavorite(id: string): void {
		this.dispatch(this.bookActions.toggleFavorite(id));
	}
	public toggleShowFavorites(): void {
		this.dispatch(this.bookActions.toggleShowFavorite());
	}

}
