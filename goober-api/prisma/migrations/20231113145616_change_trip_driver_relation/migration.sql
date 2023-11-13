-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_driver_id_fkey";

-- AlterTable
ALTER TABLE "trips" ALTER COLUMN "driver_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
