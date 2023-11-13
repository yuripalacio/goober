import { InMemoryTripsRepository } from 'test/repositories/in-memory-trips-repository'
import { makeTrip } from 'test/factories/make-trip'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CancelTripDriverUseCase } from './cancel-trip'

let inMemoryTripsRepository: InMemoryTripsRepository
let sut: CancelTripDriverUseCase

describe('Cancel a trip', () => {
  beforeEach(() => {
    inMemoryTripsRepository = new InMemoryTripsRepository()
    sut = new CancelTripDriverUseCase(inMemoryTripsRepository)
  })

  it('should be able to cancel a trip', async () => {
    const newTrip = makeTrip({}, new UniqueEntityId('trip-1'))

    await inMemoryTripsRepository.create(newTrip)

    await sut.execute({
      tripId: 'trip-1',
    })

    expect(inMemoryTripsRepository.items[0].status).toEqual('CANCELED')
  })
})
