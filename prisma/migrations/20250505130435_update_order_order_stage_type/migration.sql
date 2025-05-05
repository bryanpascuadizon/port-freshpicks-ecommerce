/*
  Warnings:

  - Made the column `orderStage` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderStage" SET NOT NULL,
ALTER COLUMN "orderStage" DROP DEFAULT;
