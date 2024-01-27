import BookListItem from './BookListItem';
import './Components.css';
import { Book } from '../types';

function BookList({booksList}: {booksList: Book[]}) {
    if (booksList.length > 0) {
        return (
            <>
                <section id="booklist" className="flex-col">
                    {booksList.map(book => (
                        <BookListItem {...book} />
                    ))}
                </section>
            </>
        );
    } else {
        return (
            <>
                <section id="booklist-empty" className="flex-col">
                    <h1>😔</h1>
                    <h1>Your bookshelf is lonely</h1>
                    <h2>Add some books and see it grow</h2>
                </section>
            </>
        );
    }
}

export default BookList;