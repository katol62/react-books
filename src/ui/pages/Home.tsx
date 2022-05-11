import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Book, ISearchPayload, IStore} from "../../service/helpers/Interfaces";
import BooksService from "../../service/services/BooksService";
import {useFavorites} from "../../service/hooks/Hooks";
import {BooksList} from "../components/BooksList";
import {SearchBox} from "../components/SearchBox";
import {Form} from "react-bootstrap";
import {Loader} from "../components/Loader";

const maxResults = 30;
const defaultFilter: ISearchPayload = {q: '', maxResults: maxResults, startIndex: 0};

export const HomePage = () => {

	const {books, favourites, showFavorites, total, loading} = useSelector((state: IStore) => state.books);
	const [filter, setFilter] = useState(defaultFilter);
	const filteredBooks = useFavorites(books, showFavorites, favourites);

	const booksService = BooksService.instance;

	useEffect(() => {
		booksService.reset();
		if (filter.q && filter.q !== '') {
			booksService.getBooks(filter);
		}
	}, [filter.q])

	useEffect( () => {
		if (filter.startIndex > 0) {
			booksService.getBooks(filter);
		}
	}, [filter.startIndex])

	const onToggle = (book: Book) => {
		booksService.toggleFavorite(book.id);
	}

	const onQuery = (query: string) => {
		setFilter({...filter, startIndex: 0, q: query});
	}

	const toggleShow = () => {
		booksService.toggleShowFavorites();
	}

	const nextPage = () => {
		const start = filter.startIndex;
		if (!showFavorites && total > start + 1) {
			const offset = start + maxResults > total ? total - start + 1 : maxResults;
			setFilter(
				{
					...filter,
					startIndex: start + offset
				}
			);
		}
	}

	const renderSpinner = () => {
		if (loading) {
			return <Loader />
		}
	}

	return (
		<div className="container-fluid">
			<div className="col-12 mt-3">
				<SearchBox query={onQuery}/>
			</div>
			<div className="col-12">
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check checked={showFavorites} onChange={toggleShow} type="checkbox" label="Show only favorites" />
				</Form.Group>
			</div>
			<div className="col-12">
				<BooksList books={filteredBooks} toggle={onToggle} total={total} nextPage={nextPage} />
			</div>
			{renderSpinner()}
		</div>
	);
};
