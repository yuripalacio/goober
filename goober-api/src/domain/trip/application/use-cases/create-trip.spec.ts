import { InMemoryTripsRepository } from 'test/repositories/in-memory-trips-repository'
import { CreateTripUseCase } from './create-trip'

let inMemoryTripsRepository: InMemoryTripsRepository
let sut: CreateTripUseCase

describe('Create trip', () => {
  beforeEach(() => {
    inMemoryTripsRepository = new InMemoryTripsRepository()
    sut = new CreateTripUseCase(inMemoryTripsRepository)
  })

  it('should be able to create a trip', async () => {
    const result = await sut.execute({
      passengerId: '1',
      destination: 'New destiantion',
      startPoint: 'New start point',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      trip: inMemoryTripsRepository.items[0],
    })
  })
})
