import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../Components/BookCard";
import "../App.css";

const SearchResultsView = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get("query") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://gutendex.com/books?search=${encodeURIComponent(searchQuery)}&page=${currentPage}`
        );
        const data = await response.json();

        const totalBooks = data.total || data.results.length * totalPages;
        setResults(data.results);
        setTotalPages(Math.ceil(data.totalBooks / 10));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [searchQuery, currentPage]);

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

  const booksPerPage = 10;
  const displayedBooks = results.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <div>
      <h2 className="search-query">Search Results for "{searchQuery}"</h2>
      <div className="results">
        {displayedBooks.length > 0 ? (
          displayedBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="test_previous"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="test_next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResultsView;
