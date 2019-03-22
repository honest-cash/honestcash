const PRODUCTION = "https://honest.cash";
const DEV = "http://localhost:8080";

const DEV_CLIENT = "http://localhost:3010";

const PRODUCTION_CLIENT = "https://honest.cash";

export const api = `${DEV}/api`;
export const client = PRODUCTION_CLIENT;

angular.module("vqConfig", []).constant("API_URL", api);

export const dateFormat = "MMM Do YY";
