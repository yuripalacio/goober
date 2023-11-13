import { BadRequestException, Controller, Get } from '@nestjs/common'
import { FetchAwaitingTripUseCase } from '@/domain/trip/application/use-cases/fetch-awaiting-trip'
import { TripWithPassengerPresenter } from '../presenters/trip-with-passanger-presenter'

@Controller('/trips/available')
export class FetchAwaitingTripController {
  constructor(private fetchAwaitingTripUseCase: FetchAwaitingTripUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchAwaitingTripUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const trips = result.value.trips

    const teste = trips.map(TripWithPassengerPresenter.toHTTP)

    return { trips: teste }
  }
}
