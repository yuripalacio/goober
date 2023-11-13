import { Trip } from '../../enterprise/entities/trip'
import { TripWithPassenger } from '../../enterprise/entities/value-objects/tripWithPassenger'

export abstract class TripsRepository {
  abstract findAll(): Promise<Trip[]>
  abstract findById(id: string): Promise<Trip | null>
  abstract findByStatus(status: string): Promise<TripWithPassenger[]>
  abstract findAwaitingByPassenger(passengerId: string): Promise<Trip | null>
  abstract create(trip: Trip): Promise<void>
  abstract save(trip: Trip): Promise<void>
}
