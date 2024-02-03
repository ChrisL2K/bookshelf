import './App.css'
import BookList from './BookList.jsx';
import BookDisplay from './BookDisplay.jsx';
import FormDialog from './FormDialog.jsx';
import NavButton from './NavButton.jsx';
import { Book, FormState, FormStatus, FormType } from '../types.js';
import { useState } from 'react';
import { createBook } from '../modules/bookHandler.js';

function App() {
	const [booksList, setBookList] = useState<Book[]>([]);
	const [activeBook, setActiveBook] = useState<Book>();
	const [formState, setFormState] = useState<FormState>({
		type: FormType.Create,
		status: FormStatus.Closed
	});


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
		setFormState({
			type: type,
			status: FormStatus.Open
		});
	}

	const closeForm = () => setFormState((state) => ({
		...state,
		status: FormStatus.Closed
	}));


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
		book: formState.type === FormType.Edit ? activeBook : undefined,
		status: formState.status,
		fnSubmit: submitAction,
		fnClose: closeForm
	}


	return (
		<>
			<FormDialog prop={ formDialogProps } />
			<nav className="flex-col">
				<NavButton title="Add book"
					imgPath="src/assets/Add.png"
					fn={() => openForm(FormType.Create)} />
				<div className="separator-horizontal maxw80p"></div>
				{/* <NavButton title="Backlog mode" />
				<NavButton title="Sort list" />
				<NavButton title="Add filter" /> */}
			</nav>
			<main className="flex-row">
				<BookList prop={ bookListProps } />
				<BookDisplay prop={ bookDisplayProps } />
			</main>
		</>
	);
}

export default App
