export enum BookStatus { Read, Unread }
export enum ListActionType { Add, Edit, Remove, Fill }
export enum SortMode { AtoZ, ZtoA, EarliestAdded, LatestAdded }

export type DialogState = {
    open: boolean,
    element: JSX.Element | undefined
}

export type Book = {
    id: string,
    title: string,
    author: string,
    genres: string[],
    status: string,
    dateAdded: Date
}

export type SortState = {
    currentType: SortMode,
    nextType: SortMode,
    title: string,
    imgPath: string,
}