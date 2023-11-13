import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface TripWithPassengerProps {
  tripId: UniqueEntityId
  passengerId: UniqueEntityId
  startPoint: string
  destination: string
  driverId?: string | null
  status: string
  passenger: string
}

export class TripWithPassenger extends ValueObject<TripWithPassengerProps> {
  get tripId() {
    return this.props.tripId
  }

  get passengerId() {
    return this.props.passengerId
  }

  get startPoint() {
    return this.props.startPoint
  }

  get destination() {
    return this.props.destination
  }

  get driverId() {
    return this.props.driverId
  }

  set driverId(driverId: string | undefined | null) {
    this.props.driverId = driverId
  }

  get status() {
    return this.props.status
  }

  get passenger() {
    return this.props.passenger
  }

  static create(props: TripWithPassengerProps) {
    return new TripWithPassenger(props)
  }
}
