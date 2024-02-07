import { Book, SortMode } from "../types";

function sortList(array: Book[], mode: SortMode): Book[] {
    const compareFnAsc = (a: Book, b: Book): number => {
        const [vA, vB] = (mode === SortMode.AtoZ || mode === SortMode.ZtoA) ?
            [a.title, b.title] : [a.dateAdded, b.dateAdded];

        if (vA < vB) return -1;
        else if (vA > vB) return 1;
        else return 0;
    }

    if ([SortMode.AtoZ, SortMode.EarliestAdded].includes(mode) && array.length > 0) return array.slice().sort(compareFnAsc);
    else if ([SortMode.ZtoA, SortMode.LatestAdded].includes(mode) && array.length > 0) return array.slice().sort(compareFnAsc).reverse();
    else return array;
}

export default sortList;
