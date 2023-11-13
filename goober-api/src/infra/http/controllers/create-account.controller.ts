import { RegisterPassengerUseCase } from '@/domain/trip/application/use-cases/register-passenger'
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
import { PassengerPresenter } from '../presenters/passenger-presenter'

const createAccountBodySchema = z.object({
  name: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerPassenger: RegisterPassengerUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name } = body

    const result = await this.registerPassenger.execute({
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { passenger: PassengerPresenter.toHTTP(result.value.passenger) }
  }
}
