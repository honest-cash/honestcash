const env: "production" | "dev" = "dev";
const productionApiUrl = "https://honest.cash/api";
const localApiUrl = "http://localhost:8080/api";

export const environment = {
  production: false,
  apiUrl: localApiUrl,
  dateFormat: "MMM Do YY",
};
