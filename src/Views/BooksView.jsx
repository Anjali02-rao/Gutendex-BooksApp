import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function BookView() {
  const { books, loading, error, favorites, addToFavorites } =
    useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const totalPages = Math.ceil(books.length / booksPerPage);
  const paginatedBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="books-view">
      <h2>All Books</h2>
      <div className="books-container">
        {paginatedBooks.map((book) => (
          <BookCard
            book={book}
            key={book.id}
            isFavorite={favorites.includes(book.id)}
            onFavoriteClick={addToFavorites}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="previous-btn"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="next-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
