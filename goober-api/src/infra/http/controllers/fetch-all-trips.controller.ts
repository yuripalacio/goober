import { BadRequestException, Controller, Get } from '@nestjs/common'
import { FetchAllTripsUseCase } from '@/domain/trip/application/use-cases/fetch-all-trips'
import { TripPresenter } from '../presenters/trip-presenter'

@Controller('/trips/all')
export class FetchAllTripController {
  constructor(private fetchAllTripsUseCase: FetchAllTripsUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchAllTripsUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const trips = result.value.trips

    const teste = trips.map(TripPresenter.toHTTP)

    return { trips: teste }
  }
}
