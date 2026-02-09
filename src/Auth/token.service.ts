import jwt, { type JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '~/db';
import type { RefreshToken } from '../../generated/prisma/client';

export function generateAccessToken(userId: number, email: string, role: string): string {
  const secretKey = process.env.ACCESS_TOKEN_SECRET!;
  if (!secretKey) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
  }
  return jwt.sign({ userId, email, role }, secretKey, { expiresIn: '30m' });
}

export function generateRefreshToken(userId: number) {

  const secretKey = process.env.REFRESH_TOKEN_SECRET!;
  if (!secretKey) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined in environment variables");
  }
  const token = jwt.sign( { userId } , secretKey, { expiresIn: '7d' });
  return token;
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function saveRefreshToken(
  userId: number,
  token: string,
  expiresAt: Date
): Promise<RefreshToken> {
  const hashedToken = hashToken(token);

  return await prisma.refreshToken.create({
    data: {
      userId,
      token: hashedToken,
      expiresAt,
    },
  });
}

export function verifyAccessToken(token: string): {
  userId: string;
  email: string;
  role: string;
} | null {
  try {
    const payloylad = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    return {
      userId: payloylad.userId,
      email: payloylad.email,
      role: payloylad.role,
    };
  } catch (error) {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<{userId: number} | null> {
  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
    const hashedToken = hashToken(token);
    const storedToken = await prisma.refreshToken.findUnique({
      where: {token: hashedToken},
    });
    if (!storedToken) {
      return null;
    }
    if (storedToken?.expiresAt < new Date()) {
      await prisma.refreshToken.deleteMany({ where: { id: storedToken.id } });
      return null;
    }
    return { userId: payload.userId };
  } catch (error) {
    return null;
  }
}

export async function deleteRefreshToken(token: string): Promise<void> {
  const hashedToken = hashToken(token);
  await prisma.refreshToken.deleteMany({ where: { token: hashedToken } }).catch(() => {
    console.log("Failed to delete refresh token");
  });
}