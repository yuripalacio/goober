import { Injectable } from '@nestjs/common'
import { TripsRepository } from '../repositories/trips-repository'
import { Either, right } from '@/core/either'
import { Trip } from '../../enterprise/entities/trip'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CreateTripUseCaseRequest {
  passengerId: string
  startPoint: string
  destination: string
}

type CreateTripResponse = Either<
  null,
  {
    trip: Trip
  }
>

@Injectable()
export class CreateTripUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    passengerId,
    destination,
    startPoint,
  }: CreateTripUseCaseRequest): Promise<CreateTripResponse> {
    const trip = Trip.create({
      passengerId: new UniqueEntityId(passengerId),
      destination,
      startPoint,
    })

    await this.tripsRepository.create(trip)

    return right({ trip })
  }
}
