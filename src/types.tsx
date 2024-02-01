export enum Status { Read, Unread }

export enum FormState { Open, Closed }

export enum FormType { Create, Edit }

export type Book = {
    id: string;
    title: string;
    genres: string[];
    status: Status;
}