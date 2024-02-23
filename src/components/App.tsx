import './App.css'
import BookList from './BookList.jsx';
import BookDisplay from './BookDisplay.jsx';
import FormDialog from './FormDialog.jsx';
import NavButton from './NavButton.jsx';
import { BLRAction, Book, BookAction, BookState, BookStatus, FormStatus, FormType, SortMode, SortState } from '../types.js';
import { useEffect, useReducer, useState } from 'react';
import { createBook } from '../modules/bookHandler.js';
import sortList from '../modules/sorting.js';

export default function App() {
	const [formState, setFormState] = useState({ type: FormType.Create, status: FormStatus.Closed });
	const [bookState, bookDispatch] = useReducer<(state: BookState, action: BookAction) => BookState>(bookStateReducer, { list: [], active: undefined });
	const [sortState, sortDispatch] = useReducer<(state: SortState) => SortState>(sortStateReducer, {
		nextType: SortMode.LatestAdded,
		title: "Sorted by date added: oldest entries first",
		imgPath: "src/assets/Sort.png",
		nextFn: (array: Book[]) => sortList(array, SortMode.LatestAdded)
	});

	// TEST DATA, REMOVE BEFORE BUILD
	useEffect(() => {
		fetch("test_data.json")
		.then((response) => { return response.json() })
		.then((json) => {
			const books: Book[] = [];
			for (const obj of json) {
				obj.status = obj.status === "read" ?
					BookStatus.Read :
					BookStatus.Unread;

				obj.dateAdded = new Date(obj.dateAdded);

				books.push(obj);
			}
			return books;
		})
		.then((array) => bookDispatch({ type: BLRAction.Fill, payload: array }));
	}, []);


	/* state management */
	const submitAction = (data: FormData, id: string | null) => {
		const book = createBook(data, id);

		bookDispatch({
			type: id === null ? BLRAction.Add : BLRAction.Edit,
			payload: book
		});
	}


	/* prop groups */
	const bookDisplayProps = {
		book: bookState.active,
		fnEdit: () => setFormState({ type: FormType.Edit, status: FormStatus.Open }),
		fnRemove: (book: Book) => bookDispatch({ type: BLRAction.Remove, payload: book })
	}

	const bookListProps = {
		itemsList: bookState.list,
		fnDisplay: (book: Book) => bookDispatch({ type: BLRAction.Display, payload: book })
	}

	const formDialogProps = {
		book: formState.type === FormType.Edit ? bookState.active : undefined,
		status: formState.status,
		fnSubmit: submitAction,
		fnClose: () => setFormState({ type: formState.type, status: FormStatus.Closed })
	}


	return (
		<>
			<FormDialog prop={ formDialogProps } />
			<nav className="flex-col">
				<NavButton title="Add book"
					imgPath="src/assets/Add.png"
					fn={() => setFormState({ type: FormType.Create, status: FormStatus.Open })} />
				<div className="separator-horizontal margin-top24 maxw80p"></div>
				{/* <NavButton title="Backlog mode" /> */}
				<NavButton title={ sortState.title }
					imgPath={ sortState.imgPath }
					fn={() => {
						bookDispatch({ type: BLRAction.Fill, payload: sortState.nextFn(bookState.list) });
						sortDispatch();
					}} />
				{/* <NavButton title="Add filter" /> */}
			</nav>
			<main className="flex-row">
				<BookList prop={ bookListProps } />
				<BookDisplay prop={ bookDisplayProps } />
			</main>
		</>
	);
}


function bookStateReducer(
	state: BookState,
	action: BookAction
) {
	switch (action.type) {
		// Add book to list
		case BLRAction.Add: {
			const book = action.payload as Book;
			return {
				list: [...state.list, book],
				active: state.active
			};
		}
		// Edit active book
		case BLRAction.Edit: {
			const book = action.payload as Book;
			const idx = state.list.findIndex( (search) => search.id === book.id );
			state.list[idx] = book;

			return {
				list: state.list,
				active: book
			};
		}
		// Remove book
		case BLRAction.Remove: {
			const book = action.payload as Book;
			return {
				list: state.list.filter( (search) => search.id !== book.id ),
				active: undefined
			}
		}
		// Fill or replace entire list
		case BLRAction.Fill: {
			const list = action.payload as Book[];
			return {
				list: list,
				active: state.active
			}
		}
		// Display book
		case BLRAction.Display: {
			const book = action.payload as Book;
			return {
				list: state.list,
				active: book
			}
		}
	}
}

function sortStateReducer(state: SortState) {
	switch (state.nextType) {
		case SortMode.EarliestAdded:
			return {
				nextType: SortMode.LatestAdded,
				title: "Sorted by date added: oldest entries first",
				imgPath: "src/assets/Sort.png",
				nextFn: (array: Book[]) => sortList(array, SortMode.LatestAdded)
			};
		case SortMode.LatestAdded:
			return {
				nextType: SortMode.AtoZ,
				title: "Sorted by date added: most recent first",
				imgPath: "src/assets/SortR.png",
				nextFn: (array: Book[]) => sortList(array, SortMode.AtoZ)
			};
		case SortMode.AtoZ:
			return {
				nextType: SortMode.ZtoA,
				title: "Sorted by title: ascending",
				imgPath: "src/assets/SortAZ.png",
				nextFn: (array: Book[]) => sortList(array, SortMode.ZtoA)
			};
		case SortMode.ZtoA:
			return {
				nextType: SortMode.EarliestAdded,
				title: "Sorted by title: descending",
				imgPath: "src/assets/SortZA.png",
				nextFn: (array: Book[]) => sortList(array, SortMode.EarliestAdded)
			};
	}
}