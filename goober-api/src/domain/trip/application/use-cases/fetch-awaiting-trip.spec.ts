import { InMemoryTripsRepository } from 'test/repositories/in-memory-trips-repository'
import { FetchAwaitingTripUseCase } from './fetch-awaiting-trip'
import { makeTrip } from 'test/factories/make-trip'

let inMemoryTripsRepository: InMemoryTripsRepository
let sut: FetchAwaitingTripUseCase

describe('Fetch awaiting trips', () => {
  beforeEach(() => {
    inMemoryTripsRepository = new InMemoryTripsRepository()
    sut = new FetchAwaitingTripUseCase(inMemoryTripsRepository)
  })

  it('should be able to create a trip', async () => {
    await inMemoryTripsRepository.create(makeTrip())
    await inMemoryTripsRepository.create(
      makeTrip({
        status: 'CANCELED',
      }),
    )

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.trips).toHaveLength(1)
  })
})
