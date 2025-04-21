import { Microgreen } from "@/types";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { currencyFormatter } from "@/lib/utils";

const MicrogreensCard = ({ microgreen }: { microgreen: Microgreen }) => {
  return (
    <Link href={`/products/microgreens/${microgreen.slug}`}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <Image
            src={microgreen.images[0]}
            alt={microgreen.slug}
            height={300}
            width={300}
            priority={true}
            className="object-cover object-center min-h-[150px] rounded-full"
          />
        </CardHeader>
        <CardContent>
          <p className="text-center font-bold text-xl">{microgreen.name}</p>
          <p className="text-md text-center my-3 text-green-700">
            {microgreen.description[0]}
          </p>
          <p className="text-center text-md font-bold">
            {currencyFormatter.format(microgreen.price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MicrogreensCard;
