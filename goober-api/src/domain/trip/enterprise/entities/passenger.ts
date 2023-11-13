import { Entity } from '@/core/entities/entity'
import { Slug } from './value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PassengerProps {
  name: string
  slug: Slug
  createdAt: Date
}

export class Passenger extends Entity<PassengerProps> {
  get name() {
    return this.props.name
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<PassengerProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const passenger = new Passenger(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return passenger
  }
}
