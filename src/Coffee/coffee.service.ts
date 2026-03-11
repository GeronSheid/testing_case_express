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