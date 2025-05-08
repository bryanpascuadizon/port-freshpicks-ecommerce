-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "referenceNumber" DROP DEFAULT,
ALTER COLUMN "referenceNumber" SET DATA TYPE TEXT;
