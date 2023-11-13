import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Passenger,
  PassengerProps,
} from '@/domain/trip/enterprise/entities/passenger'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaPassengerMapper } from '@/infra/database/prisma/mappers/prisma-passenger-mapper'

export function makePassenger(
  override: Partial<PassengerProps> = {},
  id?: UniqueEntityId,
) {
  const passenger = Passenger.create(
    {
      name: faker.person.fullName(),
      ...override,
    },
    id,
  )

  return passenger
}

@Injectable()
export class PassengerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPassenger(
    data: Partial<PassengerProps> = {},
  ): Promise<Passenger> {
    const passenger = makePassenger(data)

    await this.prisma.user.create({
      data: PrismaPassengerMapper.toPrisma(passenger),
    })

    return passenger
  }
}
