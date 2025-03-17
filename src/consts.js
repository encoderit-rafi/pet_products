export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const ranges = [
  { id: 1, name: "this week", value: "this_week" },
  { id: 2, name: "last week", value: "last_week" },
  { id: 3, name: "this month", value: "this_month" },
  { id: 4, name: "last month", value: "last_month" },
  { id: 5, name: "this year", value: "this_year" },
  { id: 6, name: "last year", value: "last_year" },
];
export const PAGINATION = {
  page: 1,
  per_page: 20,
};
export const validationRules = {
  required: {
    required: "Field is required",
  },
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

// export function toFormData(data) {
//   const formData = new FormData();

//   for (const [key, value] of Object.entries(data)) {
//     if (Array.isArray(value)) {
//       value.forEach((file, index) => {
//         file.file
//           ? formData.append(`${key}[${index}]`, file.file)
//           : formData.append(`${key}[${index}]`, file);
//       });
//     } else {
//       value.file
//         ? formData.append(`${key}`, value.file)
//         : formData.append(`${key}`, value);
//     }
//   }
//   return formData;
// }
export function toFormData(data) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          // Directly append if it's a File object
          formData.append(`${key}[${index}]`, item);
        } else if (item?.file instanceof File) {
          // Append the file inside an object
          formData.append(`${key}[${index}]`, item.file);
        } else {
          // Append as a normal value
          formData.append(`${key}[${index}]`, String(item));
        }
      });
    } else if (value instanceof File) {
      // If the value is a File object, append it directly
      formData.append(key, value);
    } else if (value?.file instanceof File) {
      // If it's an object with a `.file` key that is a File object
      formData.append(key, value.file);
    } else {
      // Convert non-string values (numbers, booleans) to strings
      formData.append(key, String(value));
    }
  }

  return formData;
}

export function omitEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    )
  );
}
export function debounce(func, delay = 500) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
