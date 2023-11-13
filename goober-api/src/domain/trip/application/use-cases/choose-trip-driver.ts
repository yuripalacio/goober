import { Injectable } from '@nestjs/common'
import { TripsRepository } from '../repositories/trips-repository'
import { Either, left, right } from '@/core/either'
import { Trip } from '../../enterprise/entities/trip'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface ChooseTripDriverUseCaseRequest {
  tripId: string
  driverId: string
}

type ChooseTripDriverResponse = Either<
  ResourceNotFoundError,
  {
    trip: Trip
  }
>

@Injectable()
export class ChooseTripDriverUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    driverId,
    tripId,
  }: ChooseTripDriverUseCaseRequest): Promise<ChooseTripDriverResponse> {
    const trip = await this.tripsRepository.findById(tripId)

    if (!trip) {
      return left(new ResourceNotFoundError())
    }

    trip.driverId = driverId
    trip.status = 'IN_PROGRESS'

    await this.tripsRepository.save(trip)

    return right({ trip })
  }
}
