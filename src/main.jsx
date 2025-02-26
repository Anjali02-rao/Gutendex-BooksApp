import React from "react";
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
import SearchResultsView from "./Views/SearchResultsView";

const router = createBrowserRouter([
  {
    path: "/Gutendex-BooksApp",
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      { path: "", element: <HomeView /> },
      { path: "search-results", element: <SearchResultsView /> },
      { path: "bookview", element: <BooksView /> },
      { path: "book/:bookId", element: <BookDetailsView /> },
      { path: "category", element: <CategoriesView /> },
      { path: "categories/:category", element: <CategoriesView /> },
      { path: "favorites", element: <FavoritesView /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

export default router;
