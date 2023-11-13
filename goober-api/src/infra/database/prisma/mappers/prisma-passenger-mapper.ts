import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Passenger } from '@/domain/trip/enterprise/entities/passenger'
import { User as PrismaPassenger, Prisma } from '@prisma/client'

export class PrismaPassengerMapper {
  static toDomain(raw: PrismaPassenger): Passenger {
    return Passenger.create(
      {
        name: raw.name,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(passenger: Passenger): Prisma.UserUncheckedCreateInput {
    return {
      id: passenger.id.toString(),
      name: passenger.name,
      slug: passenger.slug.value,
    }
  }
}
