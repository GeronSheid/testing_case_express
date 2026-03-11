import prisma from "~/db";
import type { User, Prisma } from "../../generated/prisma/client";
import type { UserSafe } from "./user.models";

async function getAll(): Promise<UserSafe[]> {
  return await prisma.user.findMany({
    omit: { password: true },
  });
}

async function getById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

async function getByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function create(data: Prisma.UserCreateInput): Promise<UserSafe> {
  const existingUser = await getByEmail(data.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  return await prisma.user.create({
    omit: { password: true },
    data,
  });
}

async function update(id: number, data: Partial<User>): Promise<UserSafe> {
  return await prisma.user.update({
    where: { id },
    omit: { password: true },
    data,
  });
}

async function remove(id: number): Promise<User> {
  return await prisma.user.delete({
    where: { id },
  });
}

export {create, getAll, getById, getByEmail, update, remove};