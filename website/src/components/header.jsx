import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const headerStyle = {
  zIndex:'99999',
  // position: 'fixed',
  top: "0",
  boxShadow: '0px 0px 7px 0.5px rgba(179,170,179,1)'
}

const Header = () => {

  return (
    <header>
      <nav className="navbar w-100 navbar-expand-lg navbar-light bg-light" style={headerStyle}>
        <NavLink className="navbar-brand" to="/">
          <img
            src={require("../logo.jpg")}
            width="30"
            height="30"
            className="d-inline-block mr-2 align-top"
            alt=""
          />
          AcadBoost
        </NavLink>
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
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                exact
                to="/courses"
              >
                Courses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/blog">
                Blog
              </NavLink>
            </li>
            {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li> */}
          </ul>
          <ul className="navbar-nav text-center ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/auth">
                Login / Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
