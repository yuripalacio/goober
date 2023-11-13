import { TripWithPassenger } from '@/domain/trip/enterprise/entities/value-objects/tripWithPassenger'

export class TripWithPassengerPresenter {
  static toHTTP(trip: TripWithPassenger) {
    return {
      tripId: trip.tripId.toValue(),
      startPoint: trip.startPoint,
      destination: trip.destination,
      passengerId: trip.passengerId.toString(),
      passenger: trip.passenger,
      status: trip.status,
      driverId: trip.driverId,
    }
  }
}
