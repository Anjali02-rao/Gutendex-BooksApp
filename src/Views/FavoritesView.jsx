import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";

export default function FavoritesView() {
  const { favorites, books, removeFromFavorites } = useContext(AppContext);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const [favoritesState, setFavorites] = useState(favorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesState));
  }, [favoritesState]);

  const handleRemove = (bookId) => {
    removeFromFavorites(bookId);

    const updatedFavorites = favoritesState.filter(
      (book) => book.id !== bookId
    );
    setFavorites(updatedFavorites);
    console.log("Current favorites:", favoritesState);
  };

  return (
    <div className="favorites-view">
      <h2>Your Favorite Books</h2>
      <div className="books-container">
        {favoritesState.length === 0 ? (
          <p>You have no favorite books yet.</p>
        ) : (
          books
            .filter((book) =>
              favoritesState.some((favBook) => favBook.id === book.id)
            )
            .map((book) => (
              <BookCard
                key={book.id}
                book={book}
                removeFromFavorites={() => handleRemove(book.id)}
              />
            ))
        )}
      </div>
    </div>
  );
}
