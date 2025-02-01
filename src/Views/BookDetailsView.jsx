import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import "./BookDetailsView.css";
import "../App.css";

export default function BookDetailsView() {
  const { bookId } = useParams();
  const { books, favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);

  const book = books.find((b) => b.id === Number(bookId));

  if (!book) return <p>Book not found.</p>;

  const isFavorite = favorites.some((favBook) => favBook.id === book.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <div className="book-details-view">
      <h2 className="book-title">{book.title}</h2>
      <div className="book-details-container">
        <div className="book-image">
          <img
            src={book.formats["image/jpeg"] || "default-image.jpg"}
            alt={book.title}
          />
        </div>
      </div>
      <div className="book-info">
        <p>
          <strong>Author:</strong>{" "}
          {book.authors && book.authors.length > 0
            ? book.authors.map((author) => author.name).join(", ")
            : "Unknown Author"}
        </p>
        <p>
          <strong>Language:</strong> {book.languages?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Subjects:</strong> {book.subjects?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {book.description || "No description available."}
        </p>
        <p className="read-book">
          <strong>Downloads count:</strong> {book.download_count || "N/A"}
        </p>

        {book.formats?.["text/html"] && (
          <div className="actions">
            <a
              href={book.formats["text/html"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Book
            </a>

            <button onClick={handleFavoriteToggle} className="favorite-toggle">
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
