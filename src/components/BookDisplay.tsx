import { Book, FormType, Status } from '../types';
import './Components.css';

function BookDisplay({ prop }: {
    prop: {
        book: Book | undefined,
        fnEdit: (type: FormType) => void,
        fnRemove: (book: Book) => void
    }
}) {
    if (prop.book) {
        const book = prop.book;

        return (
            <>
                <section className="bookdisplay center-xy flex-col gap24">
                    { book.status == Status.Read ?
                        <div key={"read"} id="status" className="status-read">
                            <h3 className="fs16 margin-auto">Read</h3>
                        </div> :
                        <div key={"unread"} id="status" className="status-unread">
                            <h3 className="fs16 margin-auto">Unread</h3> 
                        </div>
                    }
                    <h1 className="fs32 maxw80p text-overflow">{book.title}</h1>
                    <div id="genres" className="flex-row gap8 maxw80">
                        {book.genres.map((genre, i) => (
                            <h2 key={`genre${i}`} className="fs20 text-overflow">{genre}</h2>
                        ))}
                    </div>
                    <div className="flex-row gap12 margin-top24">
                        <div title="Edit book"
                            className="nav-icon"
                            onClick={() => prop.fnEdit(FormType.Edit)}>
                                <p className="fs24">✏️</p>
                        </div>
                        <div className="separator-vertical"></div>
                        <div title="Remove book"
                            className="nav-icon"
                            onClick={() => prop.fnRemove(book)}>
                                <img src="src/assets/TrashBin.png" />
                        </div>
                    </div>
                </section>
            </>
        )
    }
    else {
        return (
            <>
                <section className="bookdisplay center-xy flex-col gap12">
                    <h1 className="fs20">📖</h1>
                    <h1 className="fs20">Book Display</h1>
                    <h2 className="fs16">Choose a book from  the list to learn more</h2>
                </section>
            </>
        )
    }
}

export default BookDisplay;