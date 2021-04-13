import { mEmployee } from "./../model/mEmployee";

const user1: mEmployee = {
  name: "John Hartman",
  title: "CEO",
  subordinates: ["Samad Pitt", "Leanna Hogg"],
};

const user2: mEmployee = {
  name: "Samad Pitt",
  title: "production supervisor",
  subordinates: ["Aila Hodgson", "Amaya Knight"],
};

const user3: mEmployee = {
  name: "Leanna Hogg",
  title: "marketing supervisor",
  subordinates: ["Vincent Todd", "Faye Oneill", "Lynn Haigh", "Aila Hodgson"],
};

export const mockEmployeeSearchResult: mEmployee[] = [user1, user2];

export const mockEmployee: mEmployee = user1;

export const mockEmployeeSubs: mEmployee[] = [user2, user3];
