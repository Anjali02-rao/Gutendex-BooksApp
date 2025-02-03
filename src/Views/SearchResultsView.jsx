import React, { useContext } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function SearchResultsView() {
  const context = useContext(AppContext);

  if (!context) {
    return <p>Loading search results...</p>;
  }

  const { searchResults } = context;

  return (
    <div className="search-results-view">
      <h2>Search Results</h2>
      {searchResults.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books-container">
          {searchResults.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
