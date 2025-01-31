import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import App from "./App.jsx";
import HomeView from "./Views/HomeView.jsx";
import BooksView from "./Views/BooksView.jsx";
import BookDetailsView from "./Views/BookDetailsView.jsx";
import ErrorView from "./Views/ErrorView";
import CategoriesView from "./Views/CategoriesView.jsx";
import FavoritesView from "./Views/FavoritesView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      { path: "Gutendex-BooksApp/", element: <HomeView /> },
      { path: "Gutendex-BooksApp/bookview", element: <BooksView /> },
      { path: "Gutendex-BooksApp/book/:bookId", element: <BookDetailsView /> },
      {
        path: "Gutendex-BooksApp/category",
        element: <CategoriesView />,
      },
      { path: "Gutendex-BooksApp/favorites", element: <FavoritesView /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} basename="/Gutendex-BooksApp" />
  </StrictMode>
);

export default router;
