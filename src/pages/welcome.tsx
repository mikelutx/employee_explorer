import React from "react";
import SearchForm from "./../components/searchForm";

export default function Welcome() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome</h1>
      <p className="lead">
        Employee explorer helps you to find people in org chart.
      </p>
      <hr className="my-4" />
      <p>Search for the employee's full name.</p>
      <SearchForm size="lg" />
    </div>
  );
}
