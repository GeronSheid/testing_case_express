import type { RoastLevel, WashingMethod } from "../../generated/prisma/enums"

export type CreateCoffeeDTO = {
  name: string,
  originCountry?: string | null,
  originRegion?: string | null,
  description?: string | null,
  altitudeMeters?: number | null,
  roastLevel?: RoastLevel | null,
  washingMethod?: WashingMethod | null,
  descriptorIds?: number[]
}