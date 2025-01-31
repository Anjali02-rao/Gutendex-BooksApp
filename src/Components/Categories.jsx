import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

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

      <div className="books-container">
        {selectedCategory && filteredBooks.length > 0 && (
          <h3>Books in {selectedCategory}</h3>
        )}

        {filteredBooks.length > 0
          ? filteredBooks.map((book) => (
              <BookCard
                book={book}
                key={book.id}
                isFavorite={favorites.includes(book.id)}
                onFavoriteClick={addToFavorites}
              />
            ))
          : selectedCategory && <p>No books found for this category.</p>}
      </div>
    </div>
  );
}

//   const handleSearch = async (catname) => {
//     setError(null);
//     setLoading(true);
//     setSelectedCategory(catname);

//     try {
//       const response = await fetch("https://gutendex.com/books/");

//       if (!response.ok) {
//         throw new Error(`Error fetching books`);
//       }

//       const data = await response.json();
//       console.log("Fetched data:", data);

//       const filteredBooks = data.results.filter((book) =>
//         book.subjects.some((subject) =>
//           subject.toLowerCase().includes(catname.toLowerCase())
//         )
//       );

//       setBooks(data.results);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="categories-container">
//       <nav className="categories">
//         <h2>Select a Category</h2>
//         <ul>
//           {categories.map((category) => (
//             <li key={category}>
//               <Link
//                 to="#"
//                 onClick={() => handleSearch(category.toLowerCase())}
//                 className={
//                   selectedCategory === category.toLowerCase() ? "active" : ""
//                 }
//               >
//                 {category}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className="books-container">
//         {selectedCategory && <h3>Books in {selectedCategory}</h3>}

//         {books.length === 0 && selectedCategory ? (
//           <p>No books found for this category.</p>
//         ) : (
//           books.map((book) => (
//             <BookCard
//               book={book}
//               key={book.id}
//               isFavorite={favorites.includes(book.id)}
//               onFavoriteClick={addToFavorites}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
