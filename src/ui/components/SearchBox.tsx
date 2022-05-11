import React, {KeyboardEvent, FormEvent} from "react";
import { debounce } from "lodash";
import {Form} from "react-bootstrap";


export interface SearchBoxProps {
	query: (query: string) => void;
}

export const SearchBox = (props: SearchBoxProps) => {

	const debouncedGet = debounce(query => {
		props.query(query);
	}, 700);

	const onInputChange = (e: FormEvent<EventTarget>) => {
		e.preventDefault();
		const target = e.target as HTMLInputElement;
		debouncedGet(target.value)
	}

	const onKeyEnter = (e: KeyboardEvent<EventTarget>) => {
		if (e.key === 'Enter') {
			const target = e.target as HTMLInputElement;
			props.query(target.value);
		}
	}

	return (
		<Form.Group className="mb-3" controlId="formBasicSearch">
			<Form.Control onChange={ onInputChange } onKeyDown={ onKeyEnter } type="text" placeholder="Type to search" />
		</Form.Group>
	)
}
