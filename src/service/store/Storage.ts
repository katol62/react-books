import {Store} from 'redux';
import throttle from 'lodash/throttle';

export enum Constants {
	STORE = 'STORE'
}

export enum EStorageType {
	SESSION = 'session',
	LOCAL = 'local'
}

export type STORAGE_TYPE = EStorageType.SESSION | EStorageType.LOCAL

export default class Storage {

	private readonly type: STORAGE_TYPE;
	private storage: any;

	constructor(type: STORAGE_TYPE = EStorageType.SESSION) {
		this.type = type;
		this.storage = this.type === EStorageType.SESSION ? sessionStorage : localStorage;
	}

	connect(store: Store): void {
		store.subscribe(
			throttle( () => {
				this.setItem(Constants.STORE, {books: store.getState().books});
			})
		)
	}

	getItem(key: string): any {
		const obj = this.storage.getItem(key);
		return obj ? JSON.parse(obj) : null;
	}

	setItem(key: string, data: any) {
		this.storage.setItem(key, JSON.stringify(data))
	}

	clear() {
		this.storage.clear();
	}

}
