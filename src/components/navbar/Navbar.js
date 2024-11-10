import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Recipely🥑</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Recipe</Link>
      </div>
    </nav>
  );
};

export default Navbar;