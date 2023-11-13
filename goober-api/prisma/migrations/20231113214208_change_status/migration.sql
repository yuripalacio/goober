/*
  Warnings:

  - You are about to drop the column `situation` on the `trips` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('AWAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "situation",
ADD COLUMN     "status" "TripStatus" NOT NULL DEFAULT 'AWAITING';
