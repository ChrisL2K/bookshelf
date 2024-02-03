import { RefObject, useRef } from 'react';
import './Components.css';
import { Book, FormStatus, BookStatus } from '../types';

function AddForm({ prop }: {
    prop: {
        book: Book | undefined,
        status: FormStatus,
        fnSubmit: (data: FormData, id: string | null) => void,
        fnClose: () => void
    }
}) {
    const dialog = useRef<HTMLDialogElement>() as RefObject<HTMLDialogElement>;
    const form = useRef<HTMLFormElement>() as RefObject<HTMLFormElement>;
    const formHeader = useRef<HTMLHeadingElement>() as RefObject<HTMLHeadingElement>;


    if (prop.status === FormStatus.Open) dialog.current?.showModal();

    if (formHeader.current) {
        formHeader.current.innerText = prop.book === undefined ?
            "Add a book" :
            "Edit book";
    }

    if (form.current && dialog.current?.open) {
        const elements = form.current.elements;
        const status = elements.namedItem("status") as RadioNodeList;

        if (prop.book === undefined) {
            status.value = "unread";
        }
        else {
            const title = elements.namedItem("title") as HTMLInputElement;
            title.value = prop.book.title;

            const author = elements.namedItem("author") as HTMLInputElement;
            author.value = prop.book.author;

            for (let i = 0; i < prop.book.genres.length; i++) {
                const genre = elements.namedItem(`genre${i+1}`) as HTMLInputElement;
                genre.value = prop.book.genres[i];
            }

            status.value = prop.book.status === BookStatus.Read ?
                "read" :
                "unread";
        }
    }


    const submit = (data: FormData) => {
        prop.book === undefined ?
            prop.fnSubmit(data, null) :
            prop.fnSubmit(data, prop.book.id);
        close();
    }
    
    const close = () => {
        prop.fnClose();
        form.current?.reset();
        dialog.current?.close();
    }
    

    return (
        <dialog ref={dialog} id="addDialog" className="margin-auto"
            onCancel={(event) => {
                event.preventDefault();
                close();
            }}>
            <h3 ref={formHeader} className="fs24 margin-bottom24"></h3>
            <form ref={form} id="addform" className="flex-col gap20"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit(new FormData(event.target as HTMLFormElement));
                }
            }>
                <div className="flex-row gap12 w100p">
                    <label className="fs20">Title:</label>
                    <input type="text" name="title" maxLength={50} required
                        placeholder="(required)" />
                </div>
                <div className="flex-row gap12 w100p">
                    <label className="fs20">Author:</label>
                    <input type="text" name="author" maxLength={50} required
                        placeholder="(required)" />
                </div>
                <div id="form-genres" className="flex-row gap12 w100p">
                    <label className="fs20">Genres:</label>
                    <div className="flex-col  gap8">
                        <input type="text" name="genre1" maxLength={15} required
                            placeholder="(required)" />
                        <input type="text" name="genre2" maxLength={15}
                            placeholder="(optional)" />
                        <input type="text" name="genre3" maxLength={15}
                            placeholder="(optional)" />
                    </div>
                </div>
                <div className="flex-row gap12 w100p">
                    <label className="fs20">Status:</label>
                    <div id="form-radios" className="flex-row gap12">
                        <label className="fs20">
                            Read
                            <input name="status" type="radio" value="read"
                                className="margin-left4" />
                        </label>
                        <label className="fs20">
                            Unread
                            <input name="status" type="radio" value="unread"
                                className="margin-left4" />
                        </label>
                    </div>
                </div>
                <div id="form-buttons" className="flex-row gap24 w100p">
                    <input type="submit" value="submit" className="button" />
                    <button className="button"
                        onClick={(event) => {
                            event.preventDefault();
                            close();
                        }
                    }>cancel</button>
                </div>
            </form>
        </dialog>
    );
}

export default AddForm;