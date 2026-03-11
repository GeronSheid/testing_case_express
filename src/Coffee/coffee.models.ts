import type {Coffee, Prisma} from "../../generated/prisma/client";

export type CoffeeWithDescriptors = Prisma.CoffeeGetPayload<{
  include: { descriptors: true }
}>;

export type CoffeeCreateInput = Prisma.CoffeeCreateInput;

export type CoffeeUpdateInput = Partial<CoffeeCreateInput>;