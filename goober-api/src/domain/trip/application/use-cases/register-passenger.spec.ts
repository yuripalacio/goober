import { InMemoryPassengersRepository } from 'test/repositories/in-memory-passengers-repository'
import { RegisterPassengerUseCase } from './register-passenger'

let inMemoryPassengersRepository: InMemoryPassengersRepository
let sut: RegisterPassengerUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryPassengersRepository = new InMemoryPassengersRepository()
    sut = new RegisterPassengerUseCase(inMemoryPassengersRepository)
  })

  it('should be able to register a passenger', async () => {
    const result = await sut.execute({
      name: 'John Doe',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      passenger: inMemoryPassengersRepository.items[0],
    })
  })
})
