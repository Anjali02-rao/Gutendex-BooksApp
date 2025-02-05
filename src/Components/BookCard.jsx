import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <Link to={`/Gutendex-BooksApp/book/${book.id}`}>
        <div className="book-card__image-container">
          <img
            src={book.formats["image/jpeg"] || "default-bookimg.jpg"}
            alt={book.title}
            className="book-card__image"
          />
        </div>
        <div className="book-card__details">
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">
            Author: {book.authors.map((author) => author.name).join(", ")}
          </p>
          <p className="book-card__language">
            Language: {book.languages?.join(", ") || "N/A"}
          </p>
        </div>
      </Link>
    </div>
  );
}
