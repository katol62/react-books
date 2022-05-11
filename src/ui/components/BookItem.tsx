import {Book} from "../../service/helpers/Interfaces";
import React from 'react';
import {Button} from "react-bootstrap";

export interface BooksItemProps {
	book: Book;
	toggle: (book: Book) => void;
}

export const BookItem = ( props: BooksItemProps ) => {

	const renderButton = () => {
			return (
				<span>
				{ props.book.favorite
						?
						<Button variant="danger" onClick={() => props.toggle(props.book)}>Remove from favorites</Button>
						:
						<Button variant="warning" onClick={() => props.toggle(props.book)}>Add to favorites</Button>
				}
				</span>
			)
	}

	return (
		<div className="col-12 pb-3 pt-3 border-top">
			<strong>TITLE: </strong> { props.book.volumeInfo?.title }<br/>
			{
				renderButton()
			}
		</div>
	)

}
