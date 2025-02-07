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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoadingState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://gutendex.com/books/?topic=${selectedCategory}&page=${currentPage}&limit=10`
        );
        if (!response.ok) {
          throw new Error("Error fetching books");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setFilteredBooks(data.results || []);
        setTotalPages(Math.ceil((data.count || 0) / 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByCategory();
  }, [selectedCategory, currentPage]);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.toLowerCase());
    setCurrentPage(1);
    setSearchQuery("");
  };

  return (
    <div className="categories-container">
      <nav className="categories">
        <h2>Select a Category</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Link
                to="#"
                onClick={() => handleCategoryChange(category)}
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

      <div className="category-container">
        {selectedCategory && !loading && filteredBooks.length > 0 && (
          <>
            <h3>Books in {selectedCategory} category</h3>
            {filteredBooks.map((book) => (
              <BookCard
                book={book}
                key={book.id}
                isFavorite={favorites.includes(book.id)}
                onFavoriteClick={addToFavorites}
              />
            ))}
          </>
        )}
      </div>

      {totalPages > 1 && (
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
    </div>
  );
}
