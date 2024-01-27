import './App.css'
import BookList from './BookList.jsx';
import BookDisplay from './BookDisplay.jsx';
import AddForm from './AddForm.jsx';
import { Book } from '../types.js';
import { useState } from 'react';
import React from 'react';

function App() {
	const dialog = React.createRef<HTMLDialogElement>();
	const [booksList, addToList] = useState<Book[]>([]);

	const addBook = (newBook: Book) => {
		addToList(
			[
				...booksList,
				newBook
			]
		);
		closeDialog();
	}

	const closeDialog = () => { if (dialog.current) dialog.current.close(); }

	return (
		<>
			<dialog id="addDialog" ref={dialog}>
				<h3>Add a book</h3>
				<AddForm
					fnSubmit={addBook}
					listSize={booksList.length}
					closeDialog={closeDialog}/>
			</dialog>
			<nav className="flex-col">
				<div className="nav-icon">
					<img src="src/assets/Library.png" />
				</div>
				<div
					onClick={() => {
						if (dialog.current) dialog.current.showModal()}
					}
					className="nav-icon">
					<img src="src/assets/Add.png" />
				</div>
			</nav>
			<main className="flex-row">
				<BookList booksList={booksList} />
				<BookDisplay />
			</main>
		</>
	);
}

export default App
