import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import { TripPresenter } from '../presenters/trip-presenter'
import { ChooseTripDriverUseCase } from '@/domain/trip/application/use-cases/choose-trip-driver'
import { z } from 'zod'

const setDriverBodySchema = z.object({
  driverId: z.string(),
})

type SetDriverBodySchema = z.infer<typeof setDriverBodySchema>

@Controller('/trips/set-driver/:tripId')
export class SetDriverController {
  constructor(private chooseTripDriverUseCase: ChooseTripDriverUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('tripId') tripId: string,
    @Body() body: SetDriverBodySchema,
  ) {
    const { driverId } = body

    const result = await this.chooseTripDriverUseCase.execute({
      driverId,
      tripId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { trip: TripPresenter.toHTTP(result.value.trip) }
  }
}
