/*
  Warnings:

  - The `status` column on the `trips` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "trips" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'AWAITING';

-- DropEnum
DROP TYPE "TripStatus";
