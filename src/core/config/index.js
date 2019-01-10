const PRODUCTION = "https://honest.cash";
const STAGE = "https://stage.honest.cash";
const DEV_API = "http://localhost:8080";
const DEV_CLIENT = "http://localhost:3010";

export let api = `${PRODUCTION}/api`;
export const client = DEV_CLIENT

angular.module("vqConfig", []).constant("API_URL", api);
