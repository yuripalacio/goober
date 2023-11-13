import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { RegisterPassengerUseCase } from '@/domain/trip/application/use-cases/register-passenger'
import { CreateTripController } from './controllers/create-trip.controller'
import { CreateTripUseCase } from '@/domain/trip/application/use-cases/create-trip'
import { FetchAwaitingTripController } from './controllers/fetch-awaiting-trip.controller'
import { FetchAwaitingTripUseCase } from '@/domain/trip/application/use-cases/fetch-awaiting-trip'
import { GetPassengerAwaitingTripController } from './controllers/get-passenger-awaiting-trip.controller'
import { GetPassengerAwaitingTripUseCaseUseCase } from '@/domain/trip/application/use-cases/get-passenger-awaiting-trip'
import { CancelTripControllerController } from './controllers/cancel-trip.controller'
import { CancelTripDriverUseCase } from '@/domain/trip/application/use-cases/cancel-trip'
import { SetDriverController } from './controllers/set-driver.controller'
import { ChooseTripDriverUseCase } from '@/domain/trip/application/use-cases/choose-trip-driver'
import { FetchAllTripController } from './controllers/fetch-all-trips.controller'
import { FetchAllTripsUseCase } from '@/domain/trip/application/use-cases/fetch-all-trips'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    CreateTripController,
    FetchAwaitingTripController,
    GetPassengerAwaitingTripController,
    CancelTripControllerController,
    SetDriverController,
    FetchAllTripController,
  ],
  providers: [
    RegisterPassengerUseCase,
    CreateTripUseCase,
    FetchAwaitingTripUseCase,
    GetPassengerAwaitingTripUseCaseUseCase,
    CancelTripDriverUseCase,
    ChooseTripDriverUseCase,
    FetchAllTripsUseCase,
  ],
})
export class HttpModule {}
