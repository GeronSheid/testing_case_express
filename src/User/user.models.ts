import type { User, Prisma } from "../../generated/prisma/client";

export type UserSafe = Omit<User, 'password'>;

export type UserCreateInput = Prisma.UserCreateInput;

export type UserUpdateInput = Partial<UserSafe>;