import { NextFunction, Request, Response } from "express";
import { webcrypto } from "crypto";
import { envs } from "../../config";

export class Github256Middleware {
  private static encoder = new TextEncoder();

  static verifyGithubSignature = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const xHubSignature = req.headers["x-hub-signature-256"];

      if (!xHubSignature || typeof xHubSignature !== "string") {
        res.status(401).json({ error: "Missing or invalid signature header" });
        return;
      }

      const body = JSON.stringify(req.body);
      const secret = envs.SECRET_TOKEN;

      const isVerified = await Github256Middleware.verifySignature(
        secret,
        xHubSignature,
        body,
      );

      if (isVerified) {
        next();
      } else {
        res.status(401).json({ error: "Invalid signature" });
      }
    } catch (error) {
      console.error("Error in verifyGithubSignature:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private static async verifySignature(
    secret: string,
    header: string,
    payload: string,
  ) {
    try {
      if (!header.includes("=")) {
        console.error("Invalid header format:", header);
        return false;
      }

      let parts = header.split("=");
      let sigHex = parts[1];

      if (!sigHex || sigHex.length === 0) {
        console.error("Empty signature hex");
        return false;
      }

      let algorithm = { name: "HMAC", hash: { name: "SHA-256" } };

      let keyBytes = Github256Middleware.encoder.encode(secret);
      let extractable = false;
      let key = await webcrypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        ["sign", "verify"],
      );

      let sigBytes = Github256Middleware.hexToBytes(sigHex);
      let dataBytes = Github256Middleware.encoder.encode(payload);
      let equal = await webcrypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes,
      );

      return equal;
    } catch (error) {
      console.error("Error verifying signature:", error);
      return false;
    }
  }

  private static hexToBytes(hex: string) {
    let len = hex.length / 2;
    let bytes = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
      let c = hex.slice(i, i + 2);
      let b = parseInt(c, 16);
      bytes[index] = b;
      index += 1;
    }

    return bytes;
  }
}
