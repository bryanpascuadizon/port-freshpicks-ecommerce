"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getSuccessFulOrder } from "@/lib/actions/OrderActions";
import { currencyFormatter, retrievePaymentMethodIcon } from "@/lib/utils";
import { OrderItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SuccessOrder = () => {
  const searchParams = useSearchParams();
  const orderReferenceNumber = searchParams.get("order_reference_number");

  const { data } = useQuery({
    queryKey: ["success-order"],
    queryFn: () => {
      const order = getSuccessFulOrder(orderReferenceNumber!);

      return order;
    },
  });

  return (
    data &&
    data.order && (
      <>
        <div className="text-center my-10">
          <CircleCheckBig
            width={100}
            height={100}
            className="text-green-700 m-auto mb-5"
          />
          <p className="text-4xl mb-5">Thank you for your purchase</p>
          <p className="text-base mb-5">Payment done successfully!</p>
        </div>
        <div className="p-5 bg-slate-100 m-auto max-w-2xl rounded-sm text-xs mb-5">
          <p className="text-xl mb-5 font-bold">Order Summary</p>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <p className="text-sm font-bold">Order Reference Number: </p>
              <p className="text-x">{orderReferenceNumber}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Payment Method: </p>
              <div className="flex gap-2">
                <Image
                  src={retrievePaymentMethodIcon(data.order.paymentMethod).icon}
                  alt={
                    retrievePaymentMethodIcon(data.order.paymentMethod).title
                  }
                  width={30}
                  height={30}
                  className="rounded-full"
                />

                <p className="self-center">
                  {retrievePaymentMethodIcon(data.order.paymentMethod).title}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mb-5 gap-5">
            <div>
              <p className="text-sm font-bold">Shipping To:</p>
              <p>{data.order.shippingAddress.address}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Contact Person:</p>
              <p>{data.order.shippingAddress.name}</p>
              <p className="text-green-700">
                {data.order.shippingAddress.phoneNumber}
              </p>
            </div>
          </div>
          <Table className="my-5">
            <TableBody>
              {data.order.orderItems.map((orderItem: OrderItem) => (
                <TableRow key={orderItem.slug} className="border-0">
                  <TableCell>
                    <Image
                      src={orderItem.images[0]}
                      alt={orderItem.slug}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </TableCell>
                  <TableCell>
                    <p className="font-bold ">{orderItem.name}</p>
                    <p className="text-green-700">{orderItem.description[0]}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    {orderItem.category}
                  </TableCell>
                  <TableCell className="text-right">
                    {currencyFormatter.format(orderItem.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {orderItem.quantity}
                  </TableCell>
                  <TableCell className="font-bold text-green-700 text-right">
                    {currencyFormatter.format(
                      orderItem.price * orderItem.quantity
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="font-bold">Shipping Fee</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right text-green-700 font-bold">
                  {currencyFormatter.format(data.order.shippingPrice)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="text-right">
            <p className="text-xl font-bold">
              Total:{" "}
              <span className="text-green-700">
                {currencyFormatter.format(data.order.totalPrice)}
              </span>
            </p>
          </div>
        </div>
        <p className="text-base text-center">
          Continue your shopping{" "}
          <Link href="/" className="text-green-700 ">
            here
          </Link>
        </p>
      </>
    )
  );
};

export default SuccessOrder;
