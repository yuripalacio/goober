import { TripsRepository } from '@/domain/trip/application/repositories/trips-repository'
import { Trip } from '@/domain/trip/enterprise/entities/trip'
import { TripWithPassenger } from '@/domain/trip/enterprise/entities/value-objects/tripWithPassenger'

export class InMemoryTripsRepository implements TripsRepository {
  public items: Trip[] = []

  constructor() {}

  async findById(id: string): Promise<Trip | null> {
    const trip = this.items.find((item) => item.id.toString() === id)

    if (!trip) {
      return null
    }

    return trip
  }

  async findByStatus(status: string): Promise<TripWithPassenger[]> {
    const trips = this.items.filter((item) => item.status === status)

    return trips as unknown as TripWithPassenger[]
  }

  async findAwaitingByPassenger(passengerId: string): Promise<Trip | null> {
    const trip = this.items.find(
      (item) =>
        item.status === 'AWAITING' &&
        item.passengerId.toString() === passengerId,
    )

    if (!trip) {
      return null
    }

    return trip
  }

  async create(trip: Trip): Promise<void> {
    this.items.push(trip)
  }

  async save(trip: Trip): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === trip.id)

    this.items[itemIndex] = trip
  }
}
