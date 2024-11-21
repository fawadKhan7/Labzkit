export const config = {
  endpoint:
    process.env.MODE === "development"
      ? process.env.REACT_APP_BACKEND_URL
      : process.env.REACT_APP_PROD_URL,
};
