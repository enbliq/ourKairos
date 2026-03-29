import { randomBytes } from "node:crypto";

export const generateRecipientToken = (size = 24) =>
  randomBytes(size).toString("base64url");
