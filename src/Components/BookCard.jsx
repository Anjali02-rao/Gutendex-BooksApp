import React from "react";
import { Link } from "react-router-dom";

// import "./BookCard.css";

export default function BookCard({ book, addToFavorites }) {
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        <img
          src={book.formats["image/jpeg"] || "default-bookimg.jpg"}
          alt={book.title}
          className="book-card__image"
        />

        <div className="book-card__details">
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">
            Author: {book.authors.map((author) => author.name).join(", ")}
          </p>
          <p className="book-card__language">
            Language: {book.languages?.join(", ") || "N/A"}
          </p>
          <p className="book-card__subject">
            Subject: {book.subjects?.join(", ") || "N/A"}
          </p>
        </div>
        {/* <button onClick={() => addToFavorites(book)}>Add to Favorites</button> */}
      </Link>
    </div>
  );
}
