import React, { useState } from "react";
import { useHistory } from "react-router-dom";
interface Props {
  size?: "sm" | "lg";
}
const SearchForm: React.FC<Props> = ({ size = "sm" }) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState<string>("");

  const onTextInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      history.push(`/search/${keyword.trim()}`);
    }
  };
  return (
    <form className="my-2 my-lg-0" onSubmit={onSubmitHandler}>
      <div
        className={size === "lg" ? "input-group input-group-lg" : "input-group"}
      >
        <input
          className="form-control my-2 my-sm-0"
          type="search"
          placeholder={
            size === "lg"
              ? "Search for employee, e.g. John Hartman"
              : "Search..."
          }
          aria-label="Search"
          onChange={onTextInputChange}
          value={keyword}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
