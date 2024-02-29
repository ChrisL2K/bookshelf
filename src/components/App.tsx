import Dialog from './Dialog.js';
import NavBar from './NavBar.js';
import { GlobalStore } from './GlobalStore.js';
import BookList from './BookList.js';
import BookDisplay from './BookDisplay.js';

export default function App() {
	return (
		<GlobalStore>
			<Dialog />
			<NavBar />
			<main className="flex-row">
				<BookList />
				<BookDisplay />
			</main>
		</GlobalStore>
	);
}