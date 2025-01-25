/*
  Warnings:

  - You are about to drop the column `parentId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Property` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhoodId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_locationId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "parentId";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "locationId",
ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "neighborhoodId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
