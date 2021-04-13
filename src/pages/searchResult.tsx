import React, { useState, useEffect } from "react";
import { mEmployee } from "./../model/mEmployee";
import EmployeeList from "./../components/employee/employeeList";
import BreadCrumb from "./../components/breadCrumb";
import { searchEmployee } from "./../service/employeeApi";
import withLoadingAndError from "../components/HoCs/withLoadingAndError";
const EmployeeListWithLoadingAndError = withLoadingAndError(EmployeeList);

interface Props {
  name: string;
}

const SearchResult: React.FC<Props> = ({ name }) => {
  const [employeeList, setEmployeeList] = useState<mEmployee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    searchEmployee(name)
      .then((data) => {
        if (data.length === 0) {
          setError(`We could not find employee with name ${name}`);
          return;
        }
        setEmployeeList(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(`Error happened when searching for employee ${name}`);
      });
  }, [name]);

  return (
    <>
      <BreadCrumb>{`Search Result for "${name}"`}</BreadCrumb>
      <EmployeeListWithLoadingAndError
        loading={isLoading}
        employeeList={employeeList}
        error={error}
      />
    </>
  );
};

export default SearchResult;
