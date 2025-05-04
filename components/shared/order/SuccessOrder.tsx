"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getSuccessFulOrder } from "@/lib/actions/OrderActions";
import { currencyFormatter } from "@/lib/utils";
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
        <div className="p-5 bg-slate-100 m-auto max-w-2xl text-xs mb-5">
          <p className="text-lg">Order Summary</p>
          <Table className="my-5">
            <TableBody>
              {data.order.orderItems.map((orderItem: OrderItem) => (
                <TableRow key={orderItem.slug}>
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
            </TableBody>
          </Table>
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
