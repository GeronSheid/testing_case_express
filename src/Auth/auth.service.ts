import bcrypt from 'bcrypt';
import prisma from '~/db';
import type { UserCreateInput, UserSafe } from '~/User/user.models';
import { generateAccessToken, generateRefreshToken, saveRefreshToken, verifyRefreshToken } from './token.service';

export async function register(data: UserCreateInput): Promise<{user: UserSafe, accessToken: string, refreshToken: string}> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    omit: { password: true },
  });
  const accessToken = generateAccessToken(user.id, user.email, user.role);
  const refreshToken = generateRefreshToken(user.id);
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await saveRefreshToken(user.id, refreshToken, expiresAt);

  return { user, accessToken, refreshToken };
}

export async function login(email: string, password: string): Promise<{user: UserSafe, accessToken: string, refreshToken: string}> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }
  const accessToken = generateAccessToken(user.id, user.email, user.role);
  const refreshToken = generateRefreshToken(user.id);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await saveRefreshToken(user.id, refreshToken, expiresAt);

  const { password: _, ...userSafe } = user;

  return { user: userSafe, accessToken, refreshToken };
}

export async function refresh(refreshToken: string): Promise<{ accessToken: string } | null> {
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) {
    throw new Error("Invalid refresh token");
  }
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) {
    throw new Error("User not found");
  }
  const accessToken = generateAccessToken(payload.userId, user.email, user.role);
  return { accessToken };
}

export async function logout(refreshToken: string): Promise<void> {
  const payload = await verifyRefreshToken(refreshToken);
  if (payload) {
    await prisma.refreshToken.deleteMany({
      where: { userId: payload.userId, token: refreshToken },
    });
  }
}
