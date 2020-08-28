import * as CryptoJS from "crypto-js";

const k = CryptoJS.enc.Utf8.parse("$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNd");
const iv = CryptoJS.enc.Utf8.parse("z%C*F-JaNdRgUkXp");

export const plainTextToCipher = (textToEncrypt: string) => {
  if (!textToEncrypt) {
    return textToEncrypt;
  }

  const textEncrypted = CryptoJS.AES.encrypt(textToEncrypt, k, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  });

  return textEncrypted.toString();
};

export const cipherTextToPlain = (cipherText: string) => {
  if (!cipherTextToPlain) {
    return cipherTextToPlain;
  }
  const plainText = CryptoJS.AES.decrypt(cipherText, k, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  });

  return plainText.toString(CryptoJS.enc.Utf8);
};
