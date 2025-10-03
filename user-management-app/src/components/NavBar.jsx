import React from "react";
import SearchBar from "./SearchBar";
import "../pages/Home.css"; 

export default function NavBar() {
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <div className="brand"> <span className="brand-title"> User Management </span></div>
      </div>

      <div className="nav-center">
        <SearchBar />
      </div>

  <div className="nav-right">
  </div>
    </nav>
  );
}
