"use client";

import { getMicrogreenProductBySlug } from "@/lib/actions/ProductActions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MicrogreensImage from "./MicrogreensImage";
import AddToCartButton from "../../cart/AddToCartButton";

const MicrogreensDetails = ({ slug }: { slug: string }) => {
  const { data: microgreen } = useQuery({
    queryKey: ["microgreen-details", slug],
    queryFn: () => getMicrogreenProductBySlug(slug),
  });

  return (
    microgreen && (
      <div className="grid grid-cols-1 md:grid-cols-9 gap-5">
        <div className="col-span-3 p-5 mb-5">
          <MicrogreensImage microgreenImages={microgreen.images} />
        </div>
        <div className="col-span-6 p-5 mb-5">
          <p className="text-2xl font-bold mb-5">{microgreen.name}</p>
          <p className="text-base mb-5 text-green-700">
            {microgreen?.description[0]}
          </p>
          <p className="text-base mb-5">{microgreen.description[1]}</p>
          <p className="text-2xl font-bold mb-5">₱ {microgreen.price}</p>
          <div>
            <div className="flex gap-4 w-full">
              <AddToCartButton item={microgreen} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MicrogreensDetails;
