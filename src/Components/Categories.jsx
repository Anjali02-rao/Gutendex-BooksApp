import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";
import "../App.css";

export default function Categories() {
  const { books, setBooks, setLoading, setError, favorites, addToFavorites } =
    useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);

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

    const filtered = books.filter((book) =>
      book.subjects?.some((subject) =>
        subject.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    );
    setFilteredBooks(filtered);
  }, [selectedCategory, books]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://gutendex.com/books/");
      if (!response.ok) {
        throw new Error("Error fetching books");
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      setBooks(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="categories-container">
      <nav className="categories">
        <h2>Select a Category</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Link
                to="#"
                onClick={() => setSelectedCategory(category.toLowerCase())}
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
        {selectedCategory && filteredBooks.length > 0 && (
          <h3>Books in {selectedCategory} category</h3>
        )}

        {filteredBooks.length === 0 && selectedCategory && (
          <h3>No books found for this category.</h3>
        )}

        {filteredBooks.length > 0 &&
          filteredBooks.map((book) => (
            <BookCard
              book={book}
              key={book.id}
              isFavorite={favorites.includes(book.id)}
              onFavoriteClick={addToFavorites}
            />
          ))}
      </div>
    </div>
  );
}
