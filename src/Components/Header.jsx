import { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

export default function Header() {
  const { categories } = useContext(AppContext);

  return (
    <header className="main-header">
      <div>
        <h1>Gutendex</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Favorites">Favorites</Link>
          <Link to="/category">Categories</Link>
        </nav>
      </div>
    </header>
  );
}
