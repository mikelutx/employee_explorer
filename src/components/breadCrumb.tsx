import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}
const BreadCrumb: React.FC<Props> = ({ children }) => {
  const history = useHistory();

  const navToHome: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/" onClick={navToHome}>
            Home
          </a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {children}
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
