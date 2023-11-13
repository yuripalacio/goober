import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PassengersRepository } from '@/domain/trip/application/repositories/passengers-repository'
import { PrismaPassengersRepository } from './prisma/repositories/prisma-passengers-repository'
import { TripsRepository } from '@/domain/trip/application/repositories/trips-repository'
import { PrismaTripsRepository } from './prisma/repositories/prisma-trips-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PassengersRepository,
      useClass: PrismaPassengersRepository,
    },
    {
      provide: TripsRepository,
      useClass: PrismaTripsRepository,
    },
  ],
  exports: [PrismaService, PassengersRepository, TripsRepository],
})
export class DatabaseModule {}
