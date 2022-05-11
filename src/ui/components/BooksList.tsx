import React from 'react';
import {Book} from "../../service/helpers/Interfaces";
import {BookItem} from "./BookItem";
import {useInView} from "react-cool-inview";

export interface BooksListProps {
	books: Book[];
	total: number;
	toggle: (book: Book) => void;
	nextPage: () => void
}

export const BooksList = ( props: BooksListProps ) => {

	const { observe } = useInView({
		rootMargin: "50px 0px",
		onEnter: ({ unobserve }) => {
			unobserve();
			props.nextPage();
		},
	});

	if (!props.books.length) {
		return (
			<div className="col-12 text-center mb-2">
				<h3>
					No books found
				</h3>
			</div>
		)
	}

	return (
		<div className="row">
			<div className="col-12 text-center mb-2"><h3>Total found: {props.books.length}/{props.total}</h3></div>
			<div className="col-12">
				<div className="row">
					{
						props.books.map( (book: Book, index) => (
							<div className="col-12" key={index} ref={index === props.books.length - 1 ? observe : null}>
								<BookItem key={book.id} book={book} toggle={props.toggle} />
							</div>
						))
					}
				</div>
			</div>
		</div>
	)


}
