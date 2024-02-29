import { useContext } from 'react';
import BookListItem from './BookListItem';
import { CTXT_BooksList } from '../modules/contexts';

export default function BookList() {
    const ctxt = useContext(CTXT_BooksList);

    if (ctxt && ctxt.list.length > 0) {
        const {list} = ctxt;
        return (
            <section className="booklist flex-col -list">
                {list.map(book => (
                    <BookListItem key={book.id} book={book} />
                ))}
            </section>
        );
    } else {
        return (
            <section className="booklist center-xy flex-col gap12">
                <h1 className="fs40 nf-icons">󰱬</h1>
                <h1 className="fs20">Your bookshelf is lonely</h1>
                <h2 className="fs16">Add some books and see it grow</h2>
            </section>
        );
    }
}