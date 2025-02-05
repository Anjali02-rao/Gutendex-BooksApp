import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function BookView() {
  const { books, loading, error, favorites, addToFavorites } =
    useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [paginatedBooks, setPaginatedBooks] = useState([]);

  const totalPages = Math.ceil(books.length / booksPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    setPaginatedBooks(books.slice(startIndex, endIndex));
  }, [currentPage, books]);
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="previous-btn"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}
