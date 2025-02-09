import { useContext } from "react";
import { AppContext } from "../App";
import "../App.css";

export default function HomeView() {
  const { loading, error } = useContext(AppContext);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-view">
      <h1>Welcome to the Gutendex Book Library!</h1>
    </div>
  );
}
