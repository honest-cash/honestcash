import { sha3_512 } from 'js-sha3';

export class CryptoHelper {
  public static calculateSHA3Hash = (message: string): string =>
    sha3_512(message)

  public static determineMessageForHashing = (salt: string, password: string): string =>
    `${salt}:${password}`

  public static calculatePasswordHash = (email: string, password: string): string =>
    CryptoHelper.calculateSHA3Hash(
      CryptoHelper.determineMessageForHashing(email, password)
    )
}
