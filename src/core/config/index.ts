const PRODUCTION = "https://honest.cash";
const DEV = "http://localhost:8080";

const DEV_CLIENT = "http://localhost:3010";
const PRODUCTION_CLIENT = "https://honest.cash";

export const api = `${PRODUCTION}/api`;
export const client = PRODUCTION;
export const dateFormat = "MMM Do YY";

angular.module("vqConfig", []).constant("API_URL", api);
