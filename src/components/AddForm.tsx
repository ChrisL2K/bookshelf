import React from 'react';
import { Book, Status } from '../types';
import './Components.css';

function AddForm({ fnSubmit, listSize, closeDialog }: {
    fnSubmit: (book: Book) => void,
    listSize: number,
    closeDialog: () => void
}) {
    const form = React.createRef<HTMLFormElement>();

    const createBook = (data: FormData) => {
        const genres: string[] = [];
        for (const genre of [
            data.get("genre1") as string,
            data.get("genre2") as string,
            data.get("genre3") as string
        ]) if (genre) genres.push(genre);

        const book: Book = {
            id: listSize + 1,
            title: data.get("title") as string,
            genres: genres,
            status: data.get("status") as string == ("read") ? Status.Read : Status.Unread
        }
        fnSubmit(book);

        if (form.current) form.current.reset();
    }

    const cancel = () => {
        closeDialog();
        if (form.current) form.current.reset();
    }

    return (
        <>
            <form id="addform" className="flex-col" ref={form}
                onSubmit={(event) => {
                    event.preventDefault();
                    createBook(new FormData(event.target as HTMLFormElement));
                }
            }>
                <div className="flex-row">
                    <label>Title:</label>
                    <input type="text" name="title" required />
                </div>
                <div id="input-genres" className="flex-row">
                    <label>Genres:</label>
                    <div className="flex-col">
                        <input type="text" name="genre1" required />
                        <input type="text" name="genre2" />
                        <input type="text" name="genre3" />
                    </div>
                </div>
                <div className="flex-row">
                    <label>Status:</label>
                    <div id="form-radios" className="flex-row">
                        <label>
                            Read
                            <input name="status" type="radio" value="read" />
                        </label>
                        <label>
                            Unread
                            <input name="status" type="radio" value="unread" checked />
                        </label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="submit" />
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            cancel()
                        }
                    }>cancel</button>
                </div>
            </form>
        </>
    );
}

export default AddForm;