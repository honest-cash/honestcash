import { env } from "../config/index";

export const log = env !== "production" ? console.log : (_) => {};

export const error = env !== "production" ? console.error : (_) => {};
