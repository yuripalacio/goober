import { InMemoryTripsRepository } from 'test/repositories/in-memory-trips-repository'
import { makeTrip } from 'test/factories/make-trip'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ChooseTripDriverUseCase } from './choose-trip-driver'

let inMemoryTripsRepository: InMemoryTripsRepository
let sut: ChooseTripDriverUseCase

describe('Choose trip driver', () => {
  beforeEach(() => {
    inMemoryTripsRepository = new InMemoryTripsRepository()
    sut = new ChooseTripDriverUseCase(inMemoryTripsRepository)
  })

  it('should be able to choose a driver', async () => {
    const newTrip = makeTrip({}, new UniqueEntityId('trip-1'))

    await inMemoryTripsRepository.create(newTrip)

    await sut.execute({
      driverId: 'driver-1',
      tripId: 'trip-1',
    })

    expect(inMemoryTripsRepository.items[0].driverId).toEqual('driver-1')
    expect(inMemoryTripsRepository.items[0].status).toEqual('IN_PROGRESS')
  })
})
