import { Injectable } from '@nestjs/common'
import { TripsRepository } from '../repositories/trips-repository'
import { Either, left, right } from '@/core/either'
import { Trip } from '../../enterprise/entities/trip'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface GetPassengerAwaitingTripUseCaseRequest {
  passengerId: string
}

type GetPassengerAwaitingTripUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    trip: Trip
  }
>

@Injectable()
export class GetPassengerAwaitingTripUseCaseUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    passengerId,
  }: GetPassengerAwaitingTripUseCaseRequest): Promise<GetPassengerAwaitingTripUseCaseResponse> {
    const trip = await this.tripsRepository.findAwaitingByPassenger(passengerId)

    if (!trip) {
      return left(new ResourceNotFoundError())
    }

    return right({ trip })
  }
}
