const PRODUCTION = "https://honestcash.alphateamhackers.com/api";
const DEV = "http://localhost:8080/api";

let api = PRODUCTION;

angular.module("vqConfig", [])
	.constant("API_URL", api); // https://honestcash.alphateamhackers.com