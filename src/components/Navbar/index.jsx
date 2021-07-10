import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
import { Home, UserPlus } from "react-feather";

const Navbar = ({ setTheme }) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__items">
          <NavLink to="/" className="nav__link">
            <span className="link__name"> Home</span>
          </NavLink>
        </li>
        <li className="nav__items">
          <NavLink to="/contact" className="nav__link">
            <span className="link__name"> Add Contact</span>
          </NavLink>
        </li>
      </ul>
      <div className="nav__theme">
        <span className="theme1" onClick={() => setTheme("#333")}></span>
        <span className="theme2" onClick={() => setTheme("#152166")}></span>
        <span className="theme3" onClick={() => setTheme("#088076")}></span>
      </div>
    </nav>
  );
};

export default Navbar;
