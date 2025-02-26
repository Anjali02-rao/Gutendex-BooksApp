import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import Categories from "../Components/Categories";
import "./CategoriesView.css";
import "../App.css";

export default function CategoriesView() {
  const { category } = useParams();
  const { addToFavorites } = useContext(AppContext);
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    if (!category) return;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://gutendex.com/books/?topic=${encodeURIComponent(category)}&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Error fetching books");
        }

        const data = await response.json();
        setBooks(data.results || []);
        setTotalPages(Math.ceil((data.count || 0) / 10));
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleCategoryChange = (newCategory) => {
    if (newCategory && newCategory !== category) {
      navigate(
        `/Gutendex-BooksApp/categories/${encodeURIComponent(newCategory)}`
      );
      setCurrentPage(1);
      setBooks([]);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="categories-view">
      <Categories onCategorySelect={handleCategoryChange} />

      {category && (
        <h2 className="category-heading">Books in {category} Category</h2>
      )}

      {loading && category && <h2 className="loading-text">Loading...</h2>}

      <div className="categories-books-container">
        {!loading && books.length > 0
          ? books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                addToFavorites={addToFavorites}
              />
            ))
          : !loading && category && <h2>No books found</h2>}
      </div>

      {totalPages > 1 && !loading && category && (
        <div className="pagination-controls">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="pagination-btn-prv"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="pagination-btn-nxt"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
