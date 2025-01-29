import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import App from "./App.jsx";
import HomeView from "./Views/HomeView";
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
      { path: "/", element: <HomeView /> },
      { path: "/book/:bookId", element: <BookDetailsView /> },
      { path: "/category/:category", element: <CategoriesView /> },
      { path: "/favorites", element: <FavoritesView /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
