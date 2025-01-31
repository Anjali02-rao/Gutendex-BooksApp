import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";

export default function FavoritesView() {
  const { favorites, books, removeFromFavorites } = useContext(AppContext);

  // We use the localStorage data in case the user refreshes the page
  useEffect(() => {
    // Update favorites from localStorage on page load
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // We need to track favorites as a local state as well
  const [favoritesState, setFavorites] = useState(favorites);

  // Whenever favorites change, update the state and sync with localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesState));
  }, [favoritesState]);

  const handleRemove = (bookId) => {
    removeFromFavorites(bookId); // Remove from global context
    // Update the local state
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
