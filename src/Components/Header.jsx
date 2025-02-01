import { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import "../App.css";

export default function Header() {
  const { categories } = useContext(AppContext);

  return (
    <header className="main-header">
      <div>
        <h1>Gutendex</h1>
        <nav>
          <Link to="/Gutendex-BooksApp">Home</Link>
          <Link to="/Gutendex-BooksApp/bookview">Books</Link>
          <Link to="/Gutendex-BooksApp/Favorites">Favorites</Link>
          <Link to="/Gutendex-BooksApp/category">Categories</Link>
        </nav>
      </div>
    </header>
  );
}
