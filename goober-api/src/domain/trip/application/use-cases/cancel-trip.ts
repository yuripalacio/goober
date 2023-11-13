import { Injectable } from '@nestjs/common'
import { TripsRepository } from '../repositories/trips-repository'
import { Either, left, right } from '@/core/either'
import { Trip } from '../../enterprise/entities/trip'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CancelTripDriverUseCaseRequest {
  tripId: string
}

type CancelTripDriverResponse = Either<
  ResourceNotFoundError,
  {
    trip: Trip
  }
>

@Injectable()
export class CancelTripDriverUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    tripId,
  }: CancelTripDriverUseCaseRequest): Promise<CancelTripDriverResponse> {
    const trip = await this.tripsRepository.findById(tripId)

    if (!trip) {
      return left(new ResourceNotFoundError())
    }

    trip.status = 'CANCELED'

    await this.tripsRepository.save(trip)

    return right({ trip })
  }
}
