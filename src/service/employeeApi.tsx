import { mEmployee } from "../model/mEmployee";
const APIURL = "https://api.additivasia.io/api/v1/assignment/employees/";
const LOCALSTORAGE_PREFIX = "empapp_";
const ENABLE_LOCALSTORAGE = process.env.REACT_APP_ENABLE_LOCALSTORAGE;

console.log(process.env);

export async function searchEmployee(name: string): Promise<mEmployee[]> {
  return getEmployeeDetail(name).then((employee) => {
    if (employee !== null) return [employee];
    else return [];
  });
}
export async function getEmployeeDetail(
  name: string
): Promise<mEmployee | null> {
  name = name.toLowerCase();

  const url = APIURL + encodeURIComponent(name);

  if (ENABLE_LOCALSTORAGE) {
    try {
      const employeeInfo: string | null = localStorage.getItem(
        LOCALSTORAGE_PREFIX + encodeURIComponent(name)
      );
      if (employeeInfo !== null) {
        let employeeObj: mEmployee = JSON.parse(employeeInfo);
        return employeeObj;
      }
    } catch {
      //quiet
    }
  }

  return fetch(url)
    .then((data) => data.json())
    .then((employee) => {
      if (Array.isArray(employee)) {
        const empObj = {
          name: getFormatName(name),
          title: employee[0],
          subordinates:
            employee.length >= 2 && employee[1]["direct-subordinates"],
        };
        if (ENABLE_LOCALSTORAGE) {
          try {
            localStorage.setItem(
              LOCALSTORAGE_PREFIX + encodeURIComponent(name),
              JSON.stringify(empObj)
            );
          } catch {}
        }
        return empObj;
      } else {
        return null;
      }
    });
}

function getFormatName(name: string): string {
  if (!name || name.length === 0 || !name.includes(" ")) return name;

  const words: string[] = name.split(" ");
  let result: string = "";
  words.forEach((word) => {
    if (result !== "") result += " ";
    result += word[0].toUpperCase() + word.substr(1);
  });
  return result;
}

async function getMultiEmployees(
  names: string[]
): Promise<(mEmployee | null)[]> {
  const promises = names.map((name) => getEmployeeDetail(name));
  return Promise.all(promises);
}

export async function getEmployeeAndSubs(
  names: string[]
): Promise<[mEmployee[], string[]]> {
  return getMultiEmployees(names).then((subs) => {
    let employees: mEmployee[] = [];
    let new_subs: string[] = [];
    subs.forEach((sub) => {
      if (sub !== null) {
        employees.push(sub);
        if (sub.subordinates && sub.subordinates.length > 0) {
          new_subs = new_subs.concat(sub.subordinates);
        }
      }
    });
    return [employees, new_subs];
  });
}
