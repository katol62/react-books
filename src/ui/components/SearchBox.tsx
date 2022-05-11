import React from "react";
import {Form} from "react-bootstrap";
import { debounce } from "lodash";


export interface SearchBoxProps {
	query: any;
}

export const SearchBox = (props: SearchBoxProps) => {

	const debouncedGet = debounce(query => {
		props.query(query);
	}, 700);

	const onInputChange = (e: any) => {
		e.preventDefault();
		debouncedGet(e.target.value)
	}

	return (
		<Form.Group className="mb-3" controlId="formBasicSearch">
			<Form.Control onChange={ onInputChange } type="text" placeholder="Type to search" />
		</Form.Group>
	)
}
