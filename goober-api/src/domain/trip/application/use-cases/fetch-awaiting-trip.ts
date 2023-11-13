import { Injectable } from '@nestjs/common'
import { TripsRepository } from '../repositories/trips-repository'
import { Either, right } from '@/core/either'
import { TripWithPassenger } from '../../enterprise/entities/value-objects/tripWithPassenger'

type FetchAwaitingUseCaseResponse = Either<
  null,
  {
    trips: TripWithPassenger[]
  }
>

@Injectable()
export class FetchAwaitingTripUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute(): Promise<FetchAwaitingUseCaseResponse> {
    const trips = await this.tripsRepository.findByStatus('AWAITING')

    return right({ trips })
  }
}
