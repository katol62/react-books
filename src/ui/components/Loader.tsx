import React from "react";
import {Spinner} from "react-bootstrap";

export const Loader = () => {
	return (
		<div className="spinner-container">
			<Spinner className="spinner-content" variant="primary" animation="border" />
		</div>
	)
}
