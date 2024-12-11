import { Buffer } from "buffer";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const urlBase64Decode = (str: string) => {
  return Buffer.from(str, "base64").toString("utf-8");
};

export const parseToken = (token: string): Record<string, any> => {
  try {
    const encoded = token.split(".")[1];
    return JSON.parse(urlBase64Decode(encoded));
  } catch (e) {
    console.log(e);
    return {};
  }
};
