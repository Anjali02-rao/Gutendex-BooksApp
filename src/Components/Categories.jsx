import React from "react";
import { Link } from "react-router-dom";

export default function Categories() {
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
    <nav className="categories">
      <h2>Select a Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
