import { Book } from '../types';
import './Components.css';

function BookListItem({book, displayBook}: {book: Book, displayBook: (book: Book) => void}) {
    return (
        <>
            <div className="booklistitem center-cross flex-row" onClick={() => displayBook(book)}>
                <div className="bli-title fs20 margin-inline12 text-overflow">{ book.title }</div>
            </div>
        </>
    );
}

export default BookListItem;