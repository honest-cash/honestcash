const PRODUCTION = "https://honest.cash";
const DEV = "http://localhost:8080";

export const env: "production" | "dev" = "dev";

export const api = `${env === "production" ? PRODUCTION : DEV}/api`;
export const client = PRODUCTION;
export const dateFormat = "MMM Do YY";

angular.module("vqConfig", []).constant("API_URL", api);
