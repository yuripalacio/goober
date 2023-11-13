import { PassengersRepository } from '@/domain/trip/application/repositories/passengers-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Passenger } from '@/domain/trip/enterprise/entities/passenger'
import { PrismaPassengerMapper } from '../mappers/prisma-passenger-mapper'

@Injectable()
export class PrismaPassengersRepository implements PassengersRepository {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string): Promise<Passenger | null> {
    const passenger = await this.prisma.user.findUnique({
      where: {
        slug,
      },
    })

    if (!passenger) {
      return null
    }

    return PrismaPassengerMapper.toDomain(passenger)
  }

  async create(passenger: Passenger): Promise<void> {
    const data = PrismaPassengerMapper.toPrisma(passenger)

    await this.prisma.user.create({
      data,
    })
  }
}
