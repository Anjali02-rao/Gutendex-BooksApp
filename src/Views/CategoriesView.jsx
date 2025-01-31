import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "./CategoriesView.css";
import Categories from "../Components/Categories";
import "../App.css";

export default function CategoriesView() {
  const { category } = useParams();
  const { addToFavorites } = useContext(AppContext);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://gutendex.com/books/?topic=${category}`
        );
        const data = await response.json();
        setBooks(data.results);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="categories-view">
      <Categories />
      {books.length > 0 && <h2>{category ? `${category} Books` : "Books"}</h2>}
      <div className="books-container">
        {books.length > 0
          ? books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                addToFavorites={addToFavorites}
              />
            ))
          : null}
      </div>
    </div>
  );
}
