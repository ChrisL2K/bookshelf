import { useContext } from 'react';
import { Book } from '../types';
import { CTXT_ActiveBook } from '../modules/contexts';

function BookListItem({ book }: { book: Book }) {
    const ctxt = useContext(CTXT_ActiveBook);
    return (
        <div className="booklistitem center-cross flex-row" onClick={ () => ctxt?.set(book) }>
            <div className="bli-title fs20 margin-inline12 text-overflow">{ book.title }</div>
        </div>
    );
}

export default BookListItem;