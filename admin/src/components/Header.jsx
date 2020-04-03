import React from 'react';
import { NavLink } from "react-router-dom";

const headerStyle = {
  zIndex: "99999",
  // position: 'fixed',
  top: "0",
  boxShadow: "0px 0px 7px 0.5px rgba(179,170,179,1)"
};

const Header = (props) => {
    return (
      <header>
        <nav
          className="navbar w-100 navbar-expand-lg navbar-light bg-light"
          style={headerStyle}
        >
          <h2 className="navbar-brand">
            AcadBoost Admin
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/app">
                  Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  exact
                  to="/app/users"
                >
                  Users
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav text-center">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {props.data}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <NavLink className="dropdown-item" to="/app/settings">
                    Settings
                  </NavLink>
                  <NavLink className="dropdown-item" to="/logout">
                    Logout
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
}
 
export default Header;