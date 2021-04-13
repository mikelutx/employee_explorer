import React from "react";
import { useHistory } from "react-router-dom";
import SearchForm from "./searchForm";

const Header: React.FC = () => {
  const history = useHistory();

  const navToHome: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="/" onClick={navToHome}>
          Employee Explorer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <SearchForm />
        </div>
      </nav>
    </header>
  );
};

export default Header;
