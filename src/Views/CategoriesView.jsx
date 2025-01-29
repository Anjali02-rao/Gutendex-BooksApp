import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "./CategoriesView.css";
import "../App.css";

export default function CategoriesView() {
  const { Category } = useParams() || {};
  const { addToFavorites } = useContext(AppContext);
  // const [favorites, setFavorites] = useState([]);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!Category) {
      setError("Category is missing.");
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const categoryQuery = encodeURIComponent(Category.toLowerCase());

        const response = await fetch(
          `https://gutendex.com/books/?topic=${categoryQuery}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books for this category");
        }

        const data = await response.json();
        if (data.results.length > 0) {
          setBooks(data.results);
        } else {
          throw new Error("No results found for this category");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [Category]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="categories-view">
      {/* <h2>
        {Category
          ? `${Category.charAt(0).toUpperCase() + Category.slice(1)} Books`
          : "Books"}
      </h2> */}
      <h2>{Category ? `${Category} Books` : "Books"}</h2>
      <div className="books-container">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              addToFavorites={addToFavorites}
            />
          ))
        ) : (
          <p>No books found in this category.</p>
        )}
      </div>
    </div>
  );
}
