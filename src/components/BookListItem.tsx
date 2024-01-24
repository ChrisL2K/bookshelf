import './Components.css';
import {Book} from '../types.tsx';

function BookListItem({title} : Book) {
    return (
        <>
            <div className="booklistitem">
                <div className="bli-title">{ title }</div>
            </div>
        </>
    );
}

export default BookListItem;