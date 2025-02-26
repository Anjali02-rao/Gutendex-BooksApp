import React, { useState, useEffect } from "react";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function BookView() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moreBooks, setMoreBooks] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const booksPerPage = 30;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gutendex.com/books/?page=${currentPage}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          setBooks(data.results);
          setTotalPages(Math.ceil(data.count / booksPerPage));
        } else {
          setMoreBooks(false);
        }
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]);

  const addToFavorites = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="previous-btn"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!moreBooks}
            className="next-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
