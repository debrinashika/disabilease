import axios from "axios";

export const url = import.meta.env.VITE_API_BASE_URL;
export const api = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const support = () => {
  const apiUrl = {
    auth: {
      login: "/login",
      register: "/register",
      refreshToken: "/refresh-token",
      logout: "/logout",
    },
    
    user: {
      self: "users/self",
    },

    assessment: {
      questions: "assessments/questions",
      submit: "assessments/submit"
    },

    taskCategory: {
      self: "task-categories",
      addValidate: "task-categories/add-validate"
    },

    task: {
      self: "tasks",
      getTask: "tasks/task",
      getCompletedTask: "tasks/completed",
    },
  };

  return { apiUrl };
};

