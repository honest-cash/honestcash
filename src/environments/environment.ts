// global var set by webpack depending on a build mode
declare var __API_URL__: string;
declare var __ENV__: "prod" | "dev" | "local";

const productionApiUrl = `${__API_URL__}`;

export const environment = {
  production: __ENV__ === "prod",
  apiUrl: productionApiUrl,
  dateFormat: "MMM Do YY",
};
