import './App.css'
import BookList from './BookList.jsx';
import BookDisplay from './BookDisplay.jsx';
import FormDialog from './FormDialog.js';
import { Book, FormState, FormType } from '../types.js';
import { useState } from 'react';
import { createBook } from '../modules/bookHandler.js';

function App() {
	const [booksList, setBookList] = useState<Book[]>([]);
	const [activeBook, setActiveBook] = useState<Book>();
	const [formType, setFormType] = useState<FormType>(FormType.Create);
	const [formState, setFormState] = useState<FormState>(FormState.Closed);


	/* state management */
	const submitAction = (data: FormData, id: string | null) => {
		const book = createBook(data, id);

		id === null ?
			addBook(book) :
			editBook(book);
	}

	const addBook = (newBook: Book) => {
		setBookList(
			[
				...booksList,
				newBook
			]
		);
	}

	const editBook = (book: Book) => {
		const copyList = () => {
			return booksList.map(modBook => modBook.id === book.id ? book : modBook)
		}

		setBookList(copyList);
		displayBook(book);
	}

	const displayBook = (book: Book) => {
		setActiveBook(book);
	}

	const removeBook = (deleteBook: Book) => {
		setBookList(
			booksList.filter((book) => book.id != deleteBook.id)
		);

		setActiveBook(undefined);
	}

	const openForm = (type: FormType) => {
		if (formType !== type) setFormType(type);

		setFormState(FormState.Open)
	}

	const closeForm = () => setFormState(FormState.Closed);


	/* prop groups */
	const bookDisplayProps = {
		book: activeBook,
		fnEdit: openForm,
		fnRemove: removeBook
	}

	const bookListProps = {
		itemsList: booksList,
		fnDisplay: displayBook
	}

	const formDialogProps = {
		book: formType === FormType.Edit ? activeBook : undefined,
		state: formState,
		fnSubmit: submitAction,
		fnClose: closeForm
	}


	return (
		<>
			<FormDialog prop={ formDialogProps } />
			<nav className="flex-col">
				<div title="Library"
					className="margin-top24 nav-icon">
					<img src="src/assets/Library.png" />
				</div>
				<div title="Add book"
					className="margin-top24 nav-icon"
					onClick={() => openForm(FormType.Create)}>
					<img src="src/assets/Add.png" />
				</div>
			</nav>
			<main className="flex-row">
				<BookList prop={ bookListProps } />
				<BookDisplay prop={ bookDisplayProps } />
			</main>
		</>
	);
}

export default App
