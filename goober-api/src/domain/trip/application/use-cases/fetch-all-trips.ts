import { Injectable } from '@nestjs/common'
import { TripsRepository } from '../repositories/trips-repository'
import { Either, right } from '@/core/either'
import { Trip } from '../../enterprise/entities/trip'

type FetchAllTripsUseCaseResponse = Either<
  null,
  {
    trips: Trip[]
  }
>

@Injectable()
export class FetchAllTripsUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute(): Promise<FetchAllTripsUseCaseResponse> {
    const trips = await this.tripsRepository.findAll()

    return right({ trips })
  }
}
