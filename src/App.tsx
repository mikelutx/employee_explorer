import React from "react";
import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Header from "./components/header";
import Welcome from "./pages/welcome";
import SearchResult from "./pages/searchResult";
import EmployeeDetail from "./pages/employeeDetail";

function App() {
  return (
    <BrowserRouter basename={"/employee_explorer"}>
      <Header />
      <main className="container">
        <section>
          <Switch>
            <Route
              exact
              path={"/search/:name"}
              render={(props) => (
                <SearchResult name={props.match.params.name} />
              )}
            ></Route>
            <Route
              exact
              path={"/employee/:name"}
              render={(props) => (
                <EmployeeDetail name={props.match.params.name} />
              )}
            ></Route>
            <Route path={"/"} component={Welcome} />
          </Switch>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
