import { Book } from '../types';
import './Components.css';

function BookListItem(book: Book) {
    return (
        <>
            <div className="booklistitem flex-row">
                <div className="bli-title">{ book.title }</div>
            </div>
        </>
    );
}

export default BookListItem;