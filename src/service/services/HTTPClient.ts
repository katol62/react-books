import axios, {AxiosInstance, AxiosResponse, AxiosError, AxiosRequestHeaders} from 'axios';
import {Store} from "redux";
import {IStore} from "../helpers/Interfaces";
import {useStore} from "react-redux";

export const contentTypes = {
	json: 'application/json',
	form: 'application/x-www-form-urlencoded',
	multipart: 'multipart/form-data',
};

export enum EMethod {
	GET= 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE'
}

export default class HTTPClient {
	baseUrl = '';
	private readonly axiosInstance: AxiosInstance;
	private rootState: Store<IStore, any> = useStore();

	constructor(url = '') {
		this.baseUrl = url;
		this.axiosInstance = axios;
		this.axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			}, (error: any) => {
				const mess = error.message ? error.message : 'Server error';
				console.log(mess);
				return Promise.reject(error);
			}
		);
	}

	private defaultOptions = {
		contentType: contentTypes.json,
		responseType: 'json',
		payload: null
	};

	private async request<T extends AxiosResponse>(method: EMethod, endpoint: string, options?: any): Promise<AxiosResponse<any, any>> {
		const opt = {
			...this.defaultOptions, ...options
		};
		let data = opt.payload ? opt.payload : null;

		const headers: AxiosRequestHeaders = {};
		headers['Content-Type'] = opt.contentType;
		headers['Accept'] = '*/*';

		if (opt.contentType === contentTypes.form) {
			data = this.stringifyForm(data);
		}

		const url = this.baseUrl + endpoint;

		const axiosOptions = {
			method: method,
			url: url,
			headers: headers,
			[method === EMethod.GET ? 'params' : 'data']: data,
			responseType: opt.responseType,
		};

		try {
			const response: AxiosResponse = await this.axiosInstance(axiosOptions);
			if (response && response.data) {
				return response;
			} else {
				const resp = {
					status: 500,
					statusText: 'Unknown Error'
				} as unknown as T;
				return resp as T;
			}
		} catch (error: any) {
			return error.response ? error.response : error;
		}

	}

	public async GET<T extends AxiosResponse>(endpoint: string, options?: any): Promise<AxiosResponse<any, any>> {
		return this.request(EMethod.GET, endpoint, options);
	}

	public async POST<T extends AxiosResponse>(endpoint: string, options?: any): Promise<AxiosResponse<any, any>> {
		return this.request(EMethod.POST, endpoint, options);
	}

	public async PUT<T extends AxiosResponse>(endpoint: string, options?: any): Promise<AxiosResponse<any, any>> {
		return this.request(EMethod.POST, endpoint, options);
	}

	private stringifyForm(form: any): string {
		return Object.keys(form)
			.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(form[k])}`)
			.join('&');
	}

}
