import './App.css'
import BookList from './BookList.jsx';
import BookDisplay from './BookDisplay.jsx';

function App() {
  return (
    <>
      <nav>
        <h3>nav bar</h3>
      </nav>
      <main>
        <BookList />
        <BookDisplay />
      </main>
    </>
  )
}

export default App
