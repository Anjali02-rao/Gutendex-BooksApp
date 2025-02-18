import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../Components/BookCard";
import "../App.css";

const SearchResultsView = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);

  const searchQuery = new URLSearchParams(search).get("query") || "";
  const searchType = new URLSearchParams(search).get("type") || "title";

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const apiParam = searchType === "author" ? "author" : "search";
        const response = await fetch(
          `https://gutendex.com/books/?${apiParam}=${encodeURIComponent(searchQuery)}&page=${currentPage}`
        );
        const data = await response.json();

        setResults(data.results || []);
        setTotalPages(Math.ceil((data.count || 0) / 10));
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, searchType, currentPage]);

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

  // const booksPerPage = 10;
  // const displayedBooks = results.slice(
  //   (currentPage - 1) * booksPerPage,
  //   currentPage * booksPerPage
  // );

  return (
    <div>
      <h2 className="search-query">
        Search Results for "{searchQuery}" ({searchType})
      </h2>
      <div className="results">
        {loading ? (
          <p>Loading books...</p>
        ) : results.length > 0 ? (
          results.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {results.length > 10 && totalPages > 1 && (
        <div className="pagination">
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
};

export default SearchResultsView;
