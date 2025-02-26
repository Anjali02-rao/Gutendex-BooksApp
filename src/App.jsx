import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import "./App.css";

export const AppContext = createContext();

export default function App() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseAPIurl = "https://gutendex.com/books";

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((favBook) => favBook.id === book.id)) {
        const updatedFavorites = [...prevFavorites, { ...book }];
        return updatedFavorites;
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (favBook) => favBook.id !== bookId
      );

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(baseAPIurl);
        const data = await response.json();
        setBooks(data.results);
      } catch (err) {
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        favorites,
        addToFavorites,
        removeFromFavorites,
        loading,
        setLoading,
        error,
        setError,
        searchResults,
        setSearchResults,
      }}
    >
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </AppContext.Provider>
  );
}
