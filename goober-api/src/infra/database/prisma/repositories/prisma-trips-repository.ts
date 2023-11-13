import { TripsRepository } from '@/domain/trip/application/repositories/trips-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Trip } from '@/domain/trip/enterprise/entities/trip'
import { PrismaTripMapper } from '../mappers/prisma-trip-mapper'
import { TripStatus } from '@prisma/client'
import { PrismaTripWithPassengerMapper } from '../mappers/prisma-trip-with-passenger-mapper'
import { TripWithPassenger } from '@/domain/trip/enterprise/entities/value-objects/tripWithPassenger'

@Injectable()
export class PrismaTripsRepository implements TripsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Trip[]> {
    const trips = await this.prisma.trip.findMany()

    return trips.map(PrismaTripMapper.toDomain)
  }

  async findById(id: string): Promise<Trip | null> {
    const trip = await this.prisma.trip.findUnique({
      where: {
        id,
      },
    })

    if (!trip) {
      return null
    }

    return PrismaTripMapper.toDomain(trip)
  }

  async findByStatus(status: string): Promise<TripWithPassenger[]> {
    const trips = await this.prisma.trip.findMany({
      where: {
        status: TripStatus[status],
      },
      include: {
        passenger: true,
      },
    })

    return trips.map(PrismaTripWithPassengerMapper.toDomain)
  }

  async findAwaitingByPassenger(passengerId: string): Promise<Trip | null> {
    const trip = await this.prisma.trip.findFirst({
      where: {
        status: { in: [TripStatus.AWAITING, TripStatus.IN_PROGRESS] },
        passengerId,
      },
    })

    if (!trip) {
      return null
    }

    return PrismaTripMapper.toDomain(trip)
  }

  async create(trip: Trip): Promise<void> {
    const data = PrismaTripMapper.toPrisma(trip)

    await this.prisma.trip.create({
      data,
    })
  }

  async save(trip: Trip): Promise<void> {
    const data = PrismaTripMapper.toPrisma(trip)

    await this.prisma.trip.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
