/*
  Warnings:

  - You are about to drop the column `cartItems` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cartItems",
ADD COLUMN     "orderItems" JSON,
ALTER COLUMN "paymentMethod" DROP NOT NULL;
