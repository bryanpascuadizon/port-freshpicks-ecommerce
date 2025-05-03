/*
  Warnings:

  - A unique constraint covering the columns `[referenceNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "order_reference_number_idx" ON "Order"("referenceNumber");
