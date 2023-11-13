import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { TripWithPassenger } from '@/domain/trip/enterprise/entities/value-objects/tripWithPassenger'
import { Trip as PrismaTrip, User as PrismaPassenger } from '@prisma/client'

type PrismaTripWithPassenger = PrismaTrip & {
  passenger: PrismaPassenger
}

export class PrismaTripWithPassengerMapper {
  static toDomain(raw: PrismaTripWithPassenger): TripWithPassenger {
    return TripWithPassenger.create({
      tripId: new UniqueEntityId(raw.id),
      destination: raw.destination,
      passengerId: new UniqueEntityId(raw.passengerId),
      startPoint: raw.startPoint,
      status: raw.status,
      passenger: raw.passenger.name,
    })
  }
}
