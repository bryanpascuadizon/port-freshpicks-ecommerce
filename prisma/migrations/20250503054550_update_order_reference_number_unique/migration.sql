/*
  Warnings:

  - The `referenceNumber` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "order_reference_number_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "referenceNumber",
ADD COLUMN     "referenceNumber" UUID NOT NULL DEFAULT gen_random_uuid();
