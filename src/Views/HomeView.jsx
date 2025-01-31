import { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import "../App.css";

export default function HomeView() {
  const { books, loading, error, favorites, addToFavorites } =
    useContext(AppContext);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul className="books-list">
        {books.map((book) => (
          <Link to={`/Gutendex-BooksApp/book/${book.id}`}>
            <li key={book.id}>{book.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
