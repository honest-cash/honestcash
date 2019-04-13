import { environment } from "../../environments/environment";

export const env: "production" | "dev" = environment.production ? "production" : "dev";

export const api = environment.apiUrl;
export const client = "https://honest.cash";
export const dateFormat = environment.dateFormat;

angular.module("vqConfig", []).constant("API_URL", api);
