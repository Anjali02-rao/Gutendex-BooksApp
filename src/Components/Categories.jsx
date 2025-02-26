import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Categories({ selectedCategory }) {
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

  return (
    <div className="categories-container">
      <nav className="categories">
        <h2>Select a Category!</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/Gutendex-BooksApp/categories/${encodeURIComponent(category.toLowerCase())}`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="category-container">
        {selectedCategory && (
          <>
            <h2 className="text">Books in {selectedCategory} category</h2>
          </>
        )}
      </div>
    </div>
  );
}
