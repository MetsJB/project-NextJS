import { JWTPayload, SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export interface JWTdata {
  userId: number;
  role: string;
  username: string;
  name: string;
}
 


export async function signAccessToken(payload: JWTdata) {
  return await new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(secret);
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
