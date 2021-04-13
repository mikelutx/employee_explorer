import React, { useState, useEffect } from "react";
import { mEmployee } from "./../model/mEmployee";
import BreadCrumb from "./../components/breadCrumb";
import EmployeeCard from "./../components/employee/employeeCard";
import EmployeeList from "./../components/employee/employeeList";
import {
  getEmployeeDetail,
  getEmployeeAndSubs,
} from "./../service/employeeApi";
import { useHistory } from "react-router-dom";
import withLoadingAndError from "../components/HoCs/withLoadingAndError";
const EmployeeCardWithLoadingAndError = withLoadingAndError(EmployeeCard);
const EmployeeListWithLoadingAndError = withLoadingAndError(EmployeeList);

interface Props {
  name: string;
}

const EmployeeDetail: React.FC<Props> = ({ name }) => {
  const history = useHistory();

  const [employee, setEmployee] = useState<mEmployee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [subOrdinates, setSubOrdinates] = useState<mEmployee[]>([]);
  const [isSubLoading, setIsSubLoading] = useState<boolean>(false);

  const [indirectSubOrdinates, setIndirectSubOrdinates] = useState<mEmployee[]>(
    []
  );
  const [isIndSubLoading, setIsIndSubLoading] = useState<boolean>(false);

  useEffect(() => {
    setEmployee(null);
    setSubOrdinates([]);
    setIndirectSubOrdinates([]);

    const getIndirectSubOrdinates = (names: string[]) => {
      getEmployeeAndSubs(names).then((employeeAndSubs) => {
        setIndirectSubOrdinates((prevSubs) =>
          prevSubs.concat(employeeAndSubs[0])
        );
        if (employeeAndSubs[1].length > 0) {
          getIndirectSubOrdinates(employeeAndSubs[1]);
        } else {
          setIsIndSubLoading(false);
        }
      });
    };

    setIsLoading(true);
    getEmployeeDetail(name).then((data) => {
      if (data === null) {
        setError(`We could not find employee with name ${name}`);
        return;
      }
      setEmployee(data);
      setIsLoading(false);
      if (data && data.subordinates && data.subordinates.length > 0) {
        setIsSubLoading(true);
        getEmployeeAndSubs(data.subordinates).then((employeeAndSubs) => {
          setSubOrdinates(employeeAndSubs[0]);
          setIsSubLoading(false);
          if (employeeAndSubs[1].length > 0) {
            setIsIndSubLoading(true);
            getIndirectSubOrdinates(employeeAndSubs[1]);
          }
        });
      }
    });
  }, [name]);

  const navBack: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <>
      <BreadCrumb>{`Employee: "${name}"`}</BreadCrumb>
      <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={navBack}>
          Go Back
        </button>
      </div>
      <div>
        <EmployeeCardWithLoadingAndError
          loading={isLoading}
          employee={employee}
          clickable={false}
          error={error}
        />
      </div>
      {employee && employee.subordinates && employee.subordinates.length > 0 && (
        <>
          <h4 className="mt-3">{`Direct subordinate(s) of ${name}`}</h4>
          <EmployeeListWithLoadingAndError
            loading={isSubLoading}
            employeeList={subOrdinates}
          />
          <h4 className="mt-3">{`Indirect subordinate(s) of ${name}`}</h4>
          <EmployeeListWithLoadingAndError
            loading={isIndSubLoading}
            employeeList={indirectSubOrdinates}
          />
        </>
      )}
    </>
  );
};

export default EmployeeDetail;
