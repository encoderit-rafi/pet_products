export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const ranges = [
  { id: 1, name: "this year", value: "this_year" },
  { id: 2, name: "last year", value: "last_year" },
  { id: 3, name: "this month", value: "this_month" },
  { id: 4, name: "last month", value: "last_month" },
  { id: 5, name: "last week", value: "last_week" },
  { id: 6, name: "today", value: "today" },
];
export const validationRules = {
  name: {
    required: "Name is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    validate: {
      noSpace: (value) => !/\s/.test(value) || "Password cannot contain spaces",
    },
  },
};
