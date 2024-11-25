import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  function handleSearch(event){
    event.preventDefault()
    navigate(`/results/${query}`)
  }
  
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3 fw-bold" to="/">
          NewsMonki
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/technology">
                    Technology
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/health">
                    Health
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/sports">
                    Sports
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/science">
                    Science
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/entertainment">
                    Entertainment
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/business">
                    Business
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search news..."
              aria-label="Search"
              value={query}
              onChange={(e)=> setQuery(e.target.value)}
            />
            <button onClick={(event)=> handleSearch(event)} className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
