import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { TripPresenter } from '../presenters/trip-presenter'
import { GetPassengerAwaitingTripUseCaseUseCase } from '@/domain/trip/application/use-cases/get-passenger-awaiting-trip'

@Controller('/trips/available/:passengerId')
export class GetPassengerAwaitingTripController {
  constructor(
    private getPassengerAwaitingTripUseCaseUseCase: GetPassengerAwaitingTripUseCaseUseCase,
  ) {}

  @Get()
  async handle(@Param('passengerId') passengerId: string) {
    const result = await this.getPassengerAwaitingTripUseCaseUseCase.execute({
      passengerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { trip: TripPresenter.toHTTP(result.value.trip) }
  }
}
