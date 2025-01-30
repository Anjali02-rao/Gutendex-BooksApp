import React, { useContext } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function FavoritesView() {
  const { books, favorites, removeFromFavorites } = useContext(AppContext);

  const favoriteBooks = books.filter((book) =>
    favorites.some((favBook) => favBook.id === book.id)
  );

  const handleFavorites = useCallback((bookId) => {
    favorites((prevFavorites) => {
      if (prevFavorites.includes(bookId)) {
        return prevFavorites.filter((id) => id !== bookId);
      } else {
        return [...prevFavorites, bookId];
      }
    });
  });

  return (
    <div className="favorites-view">
      <h2>Favorites</h2>
      {favoriteBooks.length === 0 ? (
        <p>No favorite books yet stored.</p>
      ) : (
        <div className="book-container">
          {favorites.map((book) => (
            <div key={book.id} className="favorite-item">
              <BookCard
                book={book}
                bookImage={book.formats?.["image/jpeg"] || "/default-book.jpg"}
              />

              <button
                className="remove-favorite"
                onClick={() => removeFromFavorites(book.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
