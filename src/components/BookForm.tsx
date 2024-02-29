import { RefObject, useContext, useEffect, useRef } from "react";
import { Book, ListActionType } from "../types";
import { createBook } from "../modules/bookHandler";
import { CTXT_ActiveBook, CTXT_BooksList, CTXT_Dialog } from "../modules/contexts";

export default function BookForm({ book }: { book: Book | null }) {
    const ctxtList = useContext(CTXT_BooksList);
    const ctxtDialog = useContext(CTXT_Dialog);
    const ctxtActive = useContext(CTXT_ActiveBook);

    // Dirty way to access the form after it has been initialized.
    const form = useRef<HTMLFormElement>() as RefObject<HTMLFormElement>;
    useEffect(() => {
        const status = form.current?.elements.namedItem("status") as RadioNodeList;
        // if form used to edit book, set status to book.status
        if (book) status.value = book.status
        // else default to unread
        else status.value = "unread"
    }, [book, form]);

    const submit = (fdata: FormData) => {
        if (book) {
            const b = createBook(fdata, book.id);
            ctxtList?.set({ type: ListActionType.Edit, payload: b });
            ctxtActive?.set(b);
        }
        else ctxtList?.set({ type: ListActionType.Add, payload: createBook(fdata, null) });

        ctxtDialog?.set(
            { open: false, element: undefined }
        );
    }

    return(
        <>
            <h3 className="fs24 margin-bottom24">{(book) ? "Edit book" : "Add a book"}</h3>
                <form ref={form} id="addform" className="flex-col gap20"
                    onSubmit={(event) => {
                        event.preventDefault();
                        submit(new FormData(event.target as HTMLFormElement));
                    }
                }>
                    <div className="flex-row gap12 w100p">
                        <label className="fs20">Title:</label>
                        <input type="text" name="title" maxLength={50} required
                            placeholder="(required)"
                            defaultValue={(book) ? book.title : undefined} />
                    </div>
                    <div className="flex-row gap12 w100p">
                        <label className="fs20">Author:</label>
                        <input type="text" name="author" maxLength={50} required
                            placeholder="(required)"
                            defaultValue={(book) ? book.author : undefined} />
                    </div>
                    <div id="form-genres" className="flex-row gap12 w100p">
                        <label className="fs20">Genres:</label>
                        <div className="flex-col  gap8">
                            <input type="text" name="genre1" maxLength={15} required
                                placeholder="(required)"
                                defaultValue={(book) ? book.genres[0] : undefined} />
                            <input type="text" name="genre2" maxLength={15}
                                placeholder="(optional)"
                                defaultValue={(book && book.genres[1]) ? book.genres[1] : undefined} />
                            <input type="text" name="genre3" maxLength={15}
                                placeholder="(optional)"
                                defaultValue={(book && book.genres[2]) ? book.genres[2] : undefined} />
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
                                ctxtDialog?.set(
                                    { open: false, element: undefined }
                                );
                            }
                        }>cancel</button>
                    </div>
                </form>
            </>
    );
}