import { environment } from "../../environments/environment";

export const log = !environment.production ? console.log : (_) => {};

export const error = !environment.production ? console.error : (_) => {};
