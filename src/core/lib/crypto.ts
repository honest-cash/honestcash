import { SHA3 } from "sha3";

export const calculateSHA3Hash = (message: string): string =>
  (new SHA3(512)).update(message).digest("hex");

export const calculatePasswordHash = (email: string, password: string): string =>
  calculateSHA3Hash(determineMessageForHashing(email, password));

export const determineMessageForHashing = (salt: string, password: string): string =>
    `${salt}:${password}`;
