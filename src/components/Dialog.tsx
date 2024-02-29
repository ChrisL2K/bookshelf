import { useContext } from 'react';
import { CTXT_Dialog } from '../modules/contexts';

export default function Dialog() {
    const ctxt = useContext(CTXT_Dialog);

    return (
        <dialog className="margin-auto"
            onCancel={(event) => { event.preventDefault(); }}
            open={ctxt?.state.open}>
            { ctxt?.state.element }
        </dialog>
    );
}