import React from "react";
import {Route, Routes} from 'react-router';
import {HomePage} from "../pages/Home";

export const Views = () => {

	return (
		<div>
			<Routes>
				<Route path="/" element={< HomePage />}/>
			</Routes>
		</div>
	)

}
