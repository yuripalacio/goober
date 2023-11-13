import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateTripUseCase } from '@/domain/trip/application/use-cases/create-trip'

const createTripBodySchema = z.object({
  passengerId: z.string().uuid(),
  destination: z.string(),
  startPoint: z.string(),
})

type CreateTripBodySchema = z.infer<typeof createTripBodySchema>

@Controller('/trips')
export class CreateTripController {
  constructor(private createTripUseCase: CreateTripUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createTripBodySchema))
  async handle(@Body() body: CreateTripBodySchema) {
    const { destination, passengerId, startPoint } = body

    const result = await this.createTripUseCase.execute({
      destination,
      passengerId,
      startPoint,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
