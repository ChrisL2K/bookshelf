import { useEffect, useReducer, useState } from "react";
import { Book, DialogState, ListActionType } from "../types";
import BooksListReducer from "../modules/reducers/BooksListReducer";
import { CTXT_BooksList, CTXT_ActiveBook, CTXT_Dialog } from "../modules/contexts";

export function GlobalStore({ children }: { children: JSX.Element[] }) {
    const [booksList, booksListDispatch] = useReducer(BooksListReducer, [] as Book[]);
    const [activeBook, setActiveBook] = useState<Book | null>(null);
    const [dialogState, setDialogState] = useState<DialogState>({ open: false, element: undefined });

    // TEST DATA, REMOVE BEFORE BUILD
    useEffect(() => {
        fetch("test_data.json")
        .then((response) => { return response.json() })
        .then((json) => {
            const books: Book[] = [];
            for (const obj of json) {
                obj.dateAdded = new Date(obj.dateAdded);
                books.push(obj);
            }
            return books;
        })
        .then((array) => {booksListDispatch({ type: ListActionType.Fill, payload: array }) });
    }, []);

    return(
        <CTXT_BooksList.Provider value={{ list: booksList, set: (x) => booksListDispatch(x) }}>
            <CTXT_ActiveBook.Provider value={{ book: activeBook, set: (x: Book | null) => setActiveBook(x) }}>
                <CTXT_Dialog.Provider value={{ state: dialogState, set: (x: DialogState) => setDialogState(x) }}>
                    { children }
                </CTXT_Dialog.Provider>
            </CTXT_ActiveBook.Provider>
        </CTXT_BooksList.Provider>
    );
}