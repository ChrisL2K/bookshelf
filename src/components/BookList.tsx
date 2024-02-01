import BookListItem from './BookListItem';
import './Components.css';
import { Book } from '../types';

function BookList({ prop }: {
    prop: {
        itemsList: Book[],
        fnDisplay: (book: Book) => void
    }
}) {
    if (prop.itemsList.length > 0) {
        return (
            <>
                <section className="booklist flex-col -list">
                    {prop.itemsList.map(book => (
                        <BookListItem book={book} displayBook={prop.fnDisplay} />
                    ))}
                </section>
            </>
        );
    } else {
        return (
            <>
                <section className="booklist center-xy flex-col gap12">
                    <h1 className="fs20">😔</h1>
                    <h1 className="fs20">Your bookshelf is lonely</h1>
                    <h2 className="fs16">Add some books and see it grow</h2>
                </section>
            </>
        );
    }
}

export default BookList;