const PRODUCTION = "https://honest.cash";
const STAGE = "https://stage.honest.cash";
const DEV = "http://172.20.10.5:8080";

const DEV_CLIENT = "http://localhost:3010";
const PRODUCTION_CLIENT = "https://honest.cash";

export let api = `${DEV}/api`;
export const client = PRODUCTION_CLIENT

angular.module("vqConfig", []).constant("API_URL", api);
