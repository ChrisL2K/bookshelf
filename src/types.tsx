export enum Status { Read, Unread }

export type Book = {
    id: number;
    title: string;
    genres: string[];
    status: Status;
}