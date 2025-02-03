import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function FavoritesView() {
  const { favorites, removeFromFavorites } = useContext(AppContext);
  const [favoritesState, setFavoritesState] = useState([]);

  useEffect(() => {
    setFavoritesState(favorites);
  }, [favorites]);

  const handleRemove = (bookId) => {
    removeFromFavorites(bookId);

    setFavoritesState((prevFavorites) =>
      prevFavorites.filter((book) => book.id !== bookId)
    );
  };

  return (
    <div className="favorites-view">
      {favoritesState.length === 0 ? (
        <p>You have no favorite books yet.</p>
      ) : (
        <>
          <h2>Your Favorite Books</h2>
          <div className="books-container">
            {favoritesState.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                removeFromFavorites={() => handleRemove(book.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
