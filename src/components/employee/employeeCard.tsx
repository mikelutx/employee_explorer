import React from "react";
import { mEmployee } from "../../model/mEmployee";
import { useHistory } from "react-router-dom";
interface Props {
  employee: mEmployee | null | undefined;
  clickable?: boolean;
}

const EmployeeCard: React.FC<Props> = ({ employee, clickable = true }) => {
  const history = useHistory();

  const navToDetailPage: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    history.push(`/employee/${employee?.name}`);
  };

  if (employee) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{employee.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{employee.title}</h6>
          {employee.subordinates && employee.subordinates.length > 0 ? (
            <p>{`${employee.subordinates.length} subordinate(s)`}</p>
          ) : (
            <p className="font-italic">{"Individual Contributor"}</p>
          )}
          {clickable && (
            <a href="/" className="btn btn-primary" onClick={navToDetailPage}>
              View
            </a>
          )}
        </div>
      </div>
    );
  } else return null;
};

export default EmployeeCard;
