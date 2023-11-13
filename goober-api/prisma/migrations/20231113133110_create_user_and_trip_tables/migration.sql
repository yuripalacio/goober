-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PASSENGER', 'DRIVER', 'MANAGEMENT');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('AWAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PASSENGER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "status" "TripStatus" NOT NULL DEFAULT 'AWAITING',
    "passenger_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "start_point" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
