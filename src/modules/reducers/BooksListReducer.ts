import { Book, ListActionType, SortMode } from "../../types";

export default function BooksListReducer(state: Book[], action: {
    type: ListActionType, payload: Book | Book[] | SortMode
}): Book[] {
    switch (action.type) {
        case ListActionType.Add: {
            return [...state, action.payload as Book];
        }
        case ListActionType.Edit: {
            const book = action.payload as Book;
            const idx = state.findIndex((b) => b.id === book.id);
            if (idx !== -1) state[idx] = book;
            return state;
        }
        case ListActionType.Remove: {
            const book = action.payload as Book;
            return state.filter((b) => b.id !== book.id);
        }
        case ListActionType.Fill:
            return action.payload as Book[];
    }
}