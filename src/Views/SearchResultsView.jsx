import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../Components/BookCard";
import "../App.css";

const SearchResultsView = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        console.log(
          `Fetching books for: ${searchQuery} | Page: ${currentPage}`
        );

        const response = await fetch(
          `https://gutendex.com/books/?search=${encodeURIComponent(searchQuery)}&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Error fetching search results");
        }

        const data = await response.json();

        setResults(data.results || []);
        setTotalPages(Math.ceil((data.count || 0) / 30));
      } catch (error) {
        console.error("Error occured:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (!pathname.includes("/search")) {
      setResults([]);
      setCurrentPage(1);
      navigate("/", { replace: true });
    }
  }, [pathname, navigate]);

  useEffect(() => {
    return () => {
      setResults([]);
      setCurrentPage(1);
    };
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      navigate(`?query=${encodeURIComponent(searchQuery)}&page=${nextPage}`);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate(`?query=${encodeURIComponent(searchQuery)}&page=${prevPage}`);
    }
  };

  return (
    <div>
      <h2 className="search-query">Search Results for "{searchQuery}"</h2>

      <div className="results">
        {loading ? (
          <p>Loading books...</p>
        ) : results.length > 0 ? (
          results.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {totalPages > 1 && !loading && (
        <div className="search-pagination">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="btn-prv-srh"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="btn-nxt-srh"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsView;
