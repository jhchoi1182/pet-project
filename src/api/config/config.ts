export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://next-todo-mu.vercel.app/";
  return base_url;
};

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
