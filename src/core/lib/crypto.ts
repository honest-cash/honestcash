import { SHA3 } from "sha3";

export const calculatePasswordHash = (email: string, password: string): string =>
  this.calculateSHA3Hash(
    this.determineMessageForHashing(email, password),
  );

export const determineMessageForHashing = (salt: string, password: string): string =>
    `${salt}:${password}`;

export const calculateSHA3Hash = (message: string): string =>
  (new SHA3(512)).update(message).digest("hex");
