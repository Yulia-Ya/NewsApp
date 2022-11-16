import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>HACKER NEWS</h1>
      <nav className="nav-center">
        <Link to="/" className="nav-link">
        BACK TO NEWS
        </Link>
        
      </nav>
    </header>
  );
};

export default Header;
