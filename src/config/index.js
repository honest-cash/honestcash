const PRODUCTION = "https://honest.cash/api";
const STAGE = "https://stage.honest.cash/api";
const DEV = "http://localhost:8080/api";

let api = PRODUCTION;

angular.module("vqConfig", [])
	.constant("API_URL", api);
