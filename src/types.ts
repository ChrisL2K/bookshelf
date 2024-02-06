export enum BookStatus { Read, Unread }

export enum FormStatus { Open, Closed }
export enum FormType { Create, Edit }

export enum SortMode { AtoZ, ZtoA }

export enum BLRAction { Add, Remove, Edit, Fill, Display }

export type Book = {
    id: string,
    title: string,
    author: string,
    genres: string[],
    status: BookStatus,
    dateAdded: Date
}

export type BookAction = {
    type: BLRAction,
    payload: Book | Book[],
}

export type BookState = {
    list: Book[],
    active?: Book
}

export type FormState = {
    type: FormType,
    status: FormStatus
}