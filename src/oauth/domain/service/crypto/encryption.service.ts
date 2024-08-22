import * as CryptoJS from 'crypto-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
  private readonly secretKey = process.env.SECRETKEY;

  encrypt(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey);
    return encodeURIComponent(encryptedData.toString());
  }

  decrypt(encryptedData: string): string {
    const decodedData = decodeURIComponent(encryptedData);
    const bytes = CryptoJS.AES.decrypt(decodedData, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      throw new Error('Decryption failed');
    }

    return decryptedData;
  }
}
