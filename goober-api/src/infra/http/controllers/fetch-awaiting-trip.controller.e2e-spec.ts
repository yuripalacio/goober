import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PassengerFactory } from 'test/factories/make-passenger'
import { TripFactory } from 'test/factories/make-trip'

describe('Fetch awaiting trip (E2E)', () => {
  let app: INestApplication
  let passengerFactory: PassengerFactory
  let tripFactory: TripFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PassengerFactory, TripFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    passengerFactory = moduleRef.get(PassengerFactory)
    tripFactory = moduleRef.get(TripFactory)

    await app.init()
  })

  test('[GET] /trips/available', async () => {
    const passenger = await passengerFactory.makePrismaPassenger()

    await tripFactory.makePrismaTrip({
      passengerId: passenger.id,
    })

    const response = await request(app.getHttpServer())
      .get('/trips/available')
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      trips: expect.arrayContaining([
        expect.objectContaining({ passengerId: passenger.id.toString() }),
      ]),
    })
  })
})
