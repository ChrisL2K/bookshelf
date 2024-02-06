import { Book, BookStatus } from "../types";

export function createBook(data: FormData, id: string | null) {
	const genres: string[] = [];
	for (const genre of [
		data.get("genre1") as string,
		data.get("genre2") as string,
		data.get("genre3") as string
	]) if (genre) genres.push(genre);

	const uuid = () => {
		if (id) return id;

		const newID = crypto.randomUUID().toString();
		return newID.replace(/-/g, "");
	}

	const book: Book = {
		id: uuid(),
		title: data.get("title") as string,
		author: data.get("author") as string,
		genres: genres,
		status: data.get("status") as string == ("read") ? BookStatus.Read : BookStatus.Unread,
		dateAdded: new Date()
	}

	return book;
}