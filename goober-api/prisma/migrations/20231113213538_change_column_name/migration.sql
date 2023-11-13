/*
  Warnings:

  - You are about to drop the column `status` on the `trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trips" DROP COLUMN "status",
ADD COLUMN     "situation" TEXT NOT NULL DEFAULT 'AWAITING';
