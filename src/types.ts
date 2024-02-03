export enum BookStatus { Read, Unread }

export enum FormStatus { Open, Closed }

export enum FormType { Create, Edit }

export type Book = {
    id: string,
    title: string,
    author: string,
    genres: string[],
    status: BookStatus
}

export type FormState = {
    type: FormType,
    status: FormStatus
}