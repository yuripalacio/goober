import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface TripProps {
  passengerId: UniqueEntityId
  startPoint: string
  destination: string
  driverId?: string | null
  createdAt: Date
  updatedAt?: Date | null
  status: string
}

export class Trip extends Entity<TripProps> {
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

    this.touch()
  }

  get status() {
    return this.props.status
  }

  set status(status: string) {
    this.props.status = status

    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<TripProps, 'createdAt' | 'status'>,
    id?: UniqueEntityId,
  ) {
    const trip = new Trip(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        status: props.status ?? 'AWAITING',
      },
      id,
    )

    return trip
  }
}
