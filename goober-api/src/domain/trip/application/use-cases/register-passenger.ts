import { Injectable } from '@nestjs/common'
import { PassengersRepository } from '../repositories/passengers-repository'
import { Either, right } from '@/core/either'
import { Passenger } from '../../enterprise/entities/passenger'
import { Slug } from '../../enterprise/entities/value-objects/slug'

interface RegisterPassengerUseCaseRequest {
  name: string
}

type RegisterPassengerResponse = Either<
  null,
  {
    passenger: Passenger
  }
>

@Injectable()
export class RegisterPassengerUseCase {
  constructor(private passengersRepository: PassengersRepository) {}

  async execute({
    name,
  }: RegisterPassengerUseCaseRequest): Promise<RegisterPassengerResponse> {
    const slug = Slug.createFromText(name)
    const passengerWhitSameName = await this.passengersRepository.findBySlug(
      slug.value,
    )

    if (passengerWhitSameName) {
      return right({ passenger: passengerWhitSameName })
    }

    const passenger = Passenger.create({
      name,
    })

    await this.passengersRepository.create(passenger)

    return right({ passenger })
  }
}
