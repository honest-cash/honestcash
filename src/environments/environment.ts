const env: "production" | "dev" = "dev";
const productionApiUrl = "/api";
const localApiUrl = "http://localhost:8080/api";

export const environment = {
  production: true,
  apiUrl: productionApiUrl,
  dateFormat: "MMM Do YY",
};
