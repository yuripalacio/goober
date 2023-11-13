import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PassengerFactory } from 'test/factories/make-passenger'

describe('Create trip (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let passengerFactory: PassengerFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PassengerFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    passengerFactory = moduleRef.get(PassengerFactory)

    await app.init()
  })

  test('[POST] /trips', async () => {
    const passenger = await passengerFactory.makePrismaPassenger()

    const passengerId = passenger.id.toString()

    const response = await request(app.getHttpServer())
      .post('/trips')
      .send({
        destination: `${faker.location.longitude()},${faker.location.latitude()}`,
        passengerId,
        startPoint: `${faker.location.longitude()},${faker.location.latitude()}`,
      })

    expect(response.statusCode).toBe(201)

    const tripOnDatabase = await prisma.trip.findFirst({
      where: {
        passengerId,
      },
    })

    expect(tripOnDatabase).toBeTruthy()
  })
})
