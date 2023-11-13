import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Trip } from '@/domain/trip/enterprise/entities/trip'
import { Trip as PrismaTrip, Prisma, TripStatus } from '@prisma/client'

export class PrismaTripMapper {
  static toDomain(raw: PrismaTrip): Trip {
    return Trip.create(
      {
        destination: raw.destination,
        passengerId: new UniqueEntityId(raw.passengerId),
        startPoint: raw.startPoint,
        status: raw.status,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(trip: Trip): Prisma.TripUncheckedCreateInput {
    return {
      id: trip.id.toString(),
      destination: trip.destination,
      passengerId: trip.passengerId.toString(),
      driverId: trip.driverId,
      startPoint: trip.startPoint,
      status: TripStatus[trip.status],
    }
  }
}
