import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import "../App.css";

export default function Categories() {
  const { setLoading, setError, favorites, addToFavorites } =
    useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authorSearch, setAuthorSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoadingState] = useState(false);

  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchBooksByCategory = async () => {
      setLoadingState(true);
      setError(null);
      try {
        const response = await fetch(
          `https://gutendex.com/books/?topic=${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error("Error fetching books");
        }

        const data = await response.json();
        setFilteredBooks(data.results);
        setTotalPages(Math.ceil(data.results.length / 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingState(false);
      }
    };

    fetchBooksByCategory();
  }, [selectedCategory]);

  useEffect(() => {
    if (!authorSearch) return;

    const fetchBooksByAuthor = async () => {
      setLoadingState(true);
      setError(null);
      try {
        const response = await fetch(
          `https://gutendex.com/books/?author=${authorSearch}`
        );
        if (!response.ok) {
          throw new Error("Error fetching books by author");
        }

        const data = await response.json();
        setFilteredBooks(data.results);
        setTotalPages(Math.ceil(data.results.length / 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingState(false);
      }
    };

    fetchBooksByAuthor();
  }, [authorSearch]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <div className="categories-container">
      <nav className="categories">
        <h2>Select a Category</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Link
                to="#"
                onClick={() => {
                  setSelectedCategory(category.toLowerCase());
                  setCurrentPage(1);
                }}
                className={
                  selectedCategory === category.toLowerCase() ? "active" : ""
                }
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="author-search-container"></div>

      <div className="category-container">
        {selectedCategory && (
          <>
            {loading ? (
              <h3>Loading books...</h3>
            ) : (
              <>
                {filteredBooks.length > 0 ? (
                  <>
                    <h3>Books in {selectedCategory} category</h3>
                    {currentBooks.map((book) => (
                      <BookCard
                        book={book}
                        key={book.id}
                        isFavorite={favorites.includes(book.id)}
                        onFavoriteClick={addToFavorites}
                      />
                    ))}
                  </>
                ) : (
                  <h3>No books found for this category.</h3>
                )}
              </>
            )}
          </>
        )}
      </div>

      {filteredBooks.length > 0 &&
        totalPages > 1 &&
        filteredBooks.length > 10 && (
          <div className="categories-pagination">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="cat-pg-btn-p"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="cat-pg-btn-n"
            >
              Next
            </button>
          </div>
        )}

      {filteredBooks.length > 0 &&
        totalPages > 1 &&
        filteredBooks.length > 10 && (
          <div className="author-search-pgn">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="author-pg-btn-p"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="author-pg-btn-n"
            >
              Next
            </button>
          </div>
        )}
    </div>
  );
}
