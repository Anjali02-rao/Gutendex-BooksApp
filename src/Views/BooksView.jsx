import { useContext } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function HomeView() {
  const { books, loading, error, favorites, addToFavorites } =
    useContext(AppContext);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="books-view">
      <h2>All Books</h2>
      <div className="books-container">
        {books.map((book) => (
          <BookCard
            book={book}
            key={book.id}
            isFavorite={favorites.includes(book.id)}
            onFavoriteClick={addToFavorites}
          />
        ))}
      </div>
    </div>
  );
}
