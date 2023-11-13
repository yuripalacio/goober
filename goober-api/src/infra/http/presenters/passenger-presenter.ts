import { Passenger } from '@/domain/trip/enterprise/entities/passenger'

export class PassengerPresenter {
  static toHTTP(passenger: Passenger) {
    return {
      id: passenger.id.toString(),
      name: passenger.name,
      slug: passenger.slug.value,
    }
  }
}
