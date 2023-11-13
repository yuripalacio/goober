import { Passenger } from '../../enterprise/entities/passenger'

export abstract class PassengersRepository {
  abstract findBySlug(slug: string): Promise<Passenger | null>
  abstract create(passenger: Passenger): Promise<void>
}
