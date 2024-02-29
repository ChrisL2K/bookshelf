import { useContext, useReducer } from "react";
import { ListActionType, SortMode, SortState } from "../types";
import NavButton from "./NavButton";
import { CTXT_BooksList, CTXT_Dialog } from "../modules/contexts";
import BookForm from "./BookForm";
import sortList from "../modules/sorting";

export default function NavBar() {
    const ctxtList = useContext(CTXT_BooksList);
    const ctxtDialog = useContext(CTXT_Dialog);

    const [sortState, nextSortState] = useReducer<(state: SortState) => SortState>((state: SortState): SortState => {
        return sortStateDict.get(state.nextType);
    }, sortStateDict.get(SortMode.EarliestAdded));

    return (
        <nav className="flex-col">
            <NavButton title="Add book"
                imgPath="src/assets/Add.png"
                fn={() => ctxtDialog?.set(
                    { open: true, element: <BookForm book={null} /> }
                )} />
            <div className="separator-horizontal margin-top24 maxw80p"></div>
            <NavButton title={ sortState.title }
                imgPath={ sortState.imgPath }
                fn={() => {
                    ctxtList?.set({ type: ListActionType.Fill, payload: sortList(ctxtList.list, sortState.nextType) });
                    nextSortState();
                }} />
        </nav>
    );
}

/* --- Sort States --- */
const sortStateDict = new Map();
sortStateDict.set(SortMode.EarliestAdded, {
    currentType: SortMode.EarliestAdded,
    nextType: SortMode.LatestAdded,
    title: "Sorted by date added: oldest entries first",
    imgPath: "src/assets/Sort.png",
});
sortStateDict.set(SortMode.LatestAdded, {
    currentType: SortMode.LatestAdded,
    nextType: SortMode.AtoZ,
    title: "Sorted by date added: most recent first",
    imgPath: "src/assets/SortR.png",
});
sortStateDict.set(SortMode.AtoZ, {
    currentType: SortMode.AtoZ,
    nextType: SortMode.ZtoA,
    title: "Sorted by title: ascending",
    imgPath: "src/assets/SortAZ.png",
});
sortStateDict.set(SortMode.ZtoA, {
    currentType: SortMode.ZtoA,
    nextType: SortMode.EarliestAdded,
    title: "Sorted by title: descending",
    imgPath: "src/assets/SortZA.png",
});