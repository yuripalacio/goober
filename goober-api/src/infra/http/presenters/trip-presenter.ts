import { Trip } from '@/domain/trip/enterprise/entities/trip'

export class TripPresenter {
  static toHTTP(trip: Trip) {
    return {
      id: trip.id.toString(),
      startPoint: trip.startPoint,
      destination: trip.destination,
      passengerId: trip.passengerId.toString(),
      status: trip.status,
      driverId: trip.driverId,
    }
  }
}
