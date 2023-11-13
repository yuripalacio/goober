import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Trip, TripProps } from '@/domain/trip/enterprise/entities/trip'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaTripMapper } from '@/infra/database/prisma/mappers/prisma-trip-mapper'

export function makeTrip(
  override: Partial<TripProps> = {},
  id?: UniqueEntityId,
) {
  const trip = Trip.create(
    {
      passengerId: new UniqueEntityId(),
      startPoint: `${faker.location.longitude()},${faker.location.latitude()}`,
      destination: `${faker.location.longitude()},${faker.location.latitude()}`,
      ...override,
    },
    id,
  )

  return trip
}

@Injectable()
export class TripFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaTrip(data: Partial<TripProps> = {}): Promise<Trip> {
    const trip = makeTrip(data)

    await this.prisma.trip.create({
      data: PrismaTripMapper.toPrisma(trip),
    })

    return trip
  }
}
