import { useContext } from 'react';
import { ListActionType } from '../types';
import { CTXT_ActiveBook, CTXT_BooksList, CTXT_Dialog } from '../modules/contexts';
import BookForm from './BookForm';

function BookDisplay() {
    const ctxtActive = useContext(CTXT_ActiveBook);
    const ctxtList = useContext(CTXT_BooksList);
    const ctxtDialog = useContext(CTXT_Dialog);

    if (ctxtActive?.book) {
        const status = ctxtActive.book.status.charAt(0).toUpperCase() + ctxtActive.book.status.slice(1);
        return (
            <section className="bookdisplay center-xy flex-col gap24">
                <div key={ctxtActive.book.status} id="status" className={"status-"+ctxtActive.book.status}>
                    <h3 className="fs16 margin-auto">{status}</h3>
                </div>
                <h1 className="fs32 maxw80p text-overflow">{ctxtActive.book.title}</h1>
                <h2 className="fs24 maxw80p text-overflow">{ctxtActive.book.author}</h2>
                <div className="flex-row gap8 maxw80p text-overflow">
                    {ctxtActive.book.genres.map(
                        (genre, i) => <h2 key={i} className="fs16 underline text-overflow">{genre}</h2>
                    )}
                </div>
                <div className="flex-row gap12 margin-top24">
                    <div title="Edit book"
                        className="nav-icon"
                        onClick={() => ctxtDialog?.set(
                            { open: true, element: <BookForm book={ctxtActive.book} /> }
                        )}>
                            <p className="fs32 nf-icons">󰙏</p>
                    </div>
                    <div className="separator-vertical"></div>
                    <div title="Remove book"
                        className="nav-icon"
                        onClick={() => {
                            if (ctxtActive.book) {
                                ctxtList?.set(
                                    { type: ListActionType.Remove, payload: ctxtActive.book }
                                );
                                ctxtActive.set(null);
                            }
                        }}>
                            <img src="src/assets/TrashBin.png" />
                    </div>
                </div>
            </section>
        )
    }
    else {
        return (
            <section className="bookdisplay center-xy flex-col gap12">
                <h1 className="fs40 nf-icons"></h1>
                <h1 className="fs20">Book Display</h1>
                <h2 className="fs16">Choose a book from  the list to learn more</h2>
            </section>
        )
    }
}

export default BookDisplay;