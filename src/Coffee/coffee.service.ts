import prisma from "~/db";
import type { CreateCoffeeDTO } from "./coffee.dto";
import type { CoffeeWithDescriptors } from "./coffee.models";

export async function create(data: CreateCoffeeDTO): Promise<CoffeeWithDescriptors> {
  return await prisma.coffee.create({
    data: {
      name: data.name,
      originCountry: data.originCountry || null,
      originRegion: data.originRegion || null,
      description: data.description || null,
      roastLevel: data.roastLevel ?? null,
      altitudeMeters: data.altitudeMeters ?? null,
      washingMethod: data.washingMethod ?? null,
      descriptors: data.descriptorIds && data.descriptorIds.length > 0
        ? {
            connect: data.descriptorIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: { descriptors: true },
  })
}

export async function getAll(): Promise<CoffeeWithDescriptors[]> {
  return await prisma.coffee.findMany({
    include: { descriptors: true },
  });
}

export async function getById(id: number): Promise<CoffeeWithDescriptors | null> {
  return await prisma.coffee.findUnique({
    where: { id },
    include: { descriptors: true },
  });
}

export async function update(id: number, data: Partial<CreateCoffeeDTO>): Promise<CoffeeWithDescriptors> {
  return await prisma.coffee.update({
    where: { id },
    data: {
      name: data.name,
      originCountry: data.originCountry || null,
      originRegion: data.originRegion || null,
      description: data.description || null,
      roastLevel: data.roastLevel ?? null,
      altitudeMeters: data.altitudeMeters ?? null,
      washingMethod: data.washingMethod ?? null,
      descriptors: data.descriptorIds
        ? {
            set: data.descriptorIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: { descriptors: true },
  });
}

export async function remove(id: number): Promise<CoffeeWithDescriptors> {
  return await prisma.coffee.delete({
    where: { id },
    include: { descriptors: true },
  });
}

export async function getCoffeesByDescriptor(descriptorId: number): Promise<CoffeeWithDescriptors[]> {
  return await prisma.coffee.findMany({
    where: {
      descriptors: {
        some: {
          id: descriptorId,
        },
      },
    },
    include: { descriptors: true },
  });
}