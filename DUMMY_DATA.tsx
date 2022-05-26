import moment from "moment";

export const DUMMY_DATA = [
  {
    id: "e1",
    title: "Groceries",
    amount: 31.2,
    date: moment().format("MMM Do YY"),
    type: "expense",
  },
  {
    id: "e2",
    title: "Shorts",
    amount: 15.5,
    date: moment().format("MMM Do YY"),
    type: "expense",
  },
  {
    id: "e3",
    title: "Salary",
    amount: 100,
    date: moment().format("MMM Do YY"),
    type: "income",
  },
  {
    id: "e4",
    title: "Shoes",
    amount: 50.99,
    date: moment().format("MMM Do YY"),
    type: "expense",
  },
  {
    id: "e5",
    title: "Deposit",
    amount: 250,
    date: moment().format("MMM Do YY"),
    type: "income",
  },
];
