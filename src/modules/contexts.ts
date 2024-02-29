import { createContext } from "react";
import { Book, ListActionType, SortMode, DialogState } from "../types";

export const CTXT_BooksList = createContext<{ list: Book[], set: (x: {type: ListActionType, payload: Book | Book[] | SortMode}) => void } | undefined>(undefined);
export const CTXT_ActiveBook = createContext<{ book: Book | null, set: (x: Book | null) => void; } | undefined>(undefined);
export const CTXT_Dialog = createContext<{ state: DialogState, set: (x: DialogState) => void } | undefined>(undefined);