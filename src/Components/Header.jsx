import { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const clearSearchBar = () => {
      setSearchQuery("");
    };

    return () => clearSearchBar();
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        navigate(
          `/Gutendex-BooksApp/search-results?query=${encodeURIComponent(searchQuery)}`
        );
      } catch (error) {
        console.error("Error navigating to search results:", error);
      }
    }
  };

  return (
    <header className="main-header">
      <div>
        <h1>Gutendex</h1>
        <nav>
          <Link to="/Gutendex-BooksApp/">Home</Link>
          <Link to="/Gutendex-BooksApp/bookview">Books</Link>
          <Link to="/Gutendex-BooksApp/Favorites">Favorites</Link>
          <Link to="/Gutendex-BooksApp/category">Categories</Link>
        </nav>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}
