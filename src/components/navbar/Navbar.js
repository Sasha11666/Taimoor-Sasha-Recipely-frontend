import { Link } from "react-router-dom";
import "./Navbar.css";



const Navbar = ({setDeleted, deleted}) => {

  function signOut() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userFirstName");
    setDeleted(!deleted);
  }
  
  return (
    <nav className="navbar">
      <h1>Recipely🥑</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Recipe</Link>
        <button className="button" onClick={signOut}>Sign out</button>
      </div>
    </nav>
  );
};

export default Navbar;