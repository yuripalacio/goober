import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { CancelTripDriverUseCase } from '@/domain/trip/application/use-cases/cancel-trip'

@Controller('/trips/cancel/:tripId')
export class CancelTripControllerController {
  constructor(
    private cancelTripControllerUseCaseUseCase: CancelTripDriverUseCase,
  ) {}

  @Get()
  async handle(@Param('tripId') tripId: string) {
    const result = await this.cancelTripControllerUseCaseUseCase.execute({
      tripId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
