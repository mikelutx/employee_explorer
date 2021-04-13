import React from "react";
import { mEmployee } from "../../model/mEmployee";
import EmployeeCard from "./employeeCard";

interface Props {
  employeeList: mEmployee[];
}

const EmployeeList: React.FC<Props> = ({ employeeList }) => {
  /* remove duplicated employees from list, "Aila Hodgson" is duplicated in data source */
  function removeDuplicates(employees: mEmployee[]): mEmployee[] {
    let result: mEmployee[] = [];
    const empSet = new Set();
    employees.forEach((employee) => {
      if (!empSet.has(employee.name)) {
        result.push(employee);
        empSet.add(employee.name);
      }
    });
    return result;
  }

  return (
    <div className="row">
      {removeDuplicates(employeeList).map((employee) => (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={employee.name}>
          <EmployeeCard employee={employee} />
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
