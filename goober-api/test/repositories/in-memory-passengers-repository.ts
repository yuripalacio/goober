import { PassengersRepository } from '@/domain/trip/application/repositories/passengers-repository'
import { Passenger } from '@/domain/trip/enterprise/entities/passenger'

export class InMemoryPassengersRepository implements PassengersRepository {
  public items: Passenger[] = []

  constructor() {}

  async findBySlug(slug: string): Promise<Passenger | null> {
    const passenger = this.items.find((item) => item.slug.value === slug)

    if (!passenger) {
      return null
    }

    return passenger
  }

  async create(passenger: Passenger): Promise<void> {
    this.items.push(passenger)
  }
}
