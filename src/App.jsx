import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import FavoritesView from "./Views/FavoritesView";
import BookDetailsView from "./Views/BookDetailsView";
// import Home from "./Views/Home";
import Header from "./Components/Header";
import "./App.css";

export const AppContext = createContext();

export default function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const baseAPIurl = "https://gutendex.com/books";

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(baseAPIurl);
        if (!response.ok) throw new Error("Failed to fetch books.");
        const data = await response.json();

        setBooks(data.results);
      } catch (err) {
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((favBook) => favBook.id === book.id)) {
        const updatedFavorites = [...prevFavorites, book];
        alert(`${book.title} has been added to favorites!`);
        return updatedFavorites;
      } else {
        alert(`${book.title} is already in favorites.`);
        return prevFavorites;
      }
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (favbook) => favbook.id !== bookId
      );
      alert("Book removed from favorites");
      return updatedFavorites;
    });
  };

  return (
    <AppContext.Provider
      value={{
        books,
        categories,
        cart,
        setCart,
        favorites,
        addToFavorites,
        removeFromFavorites,
        loading,
        error,
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
