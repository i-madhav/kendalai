/*
  Warnings:

  - You are about to drop the column `addressId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhoodId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `Property` table. All the data in the column will be lost.
  - Added the required column `name` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('STATE', 'CITY', 'NEIGHBORHOOD', 'ADDRESS');

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_neighborhoodId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_stateId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "type" "LocationType" NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "addressId",
DROP COLUMN "cityId",
DROP COLUMN "neighborhoodId",
DROP COLUMN "stateId",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
