"use client";

import { getMicrogreenProductBySlug } from "@/lib/actions/ProductActions";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MicrogreensImage from "./MicrogreensImage";
import { Button } from "@/components/ui/button";
import MicrogreensSummary from "./MicrogreensSummary";

const MicrogreensDetails = ({ slug }: { slug: string }) => {
  const { data: microgreen } = useQuery({
    queryKey: ["microgreen-details", slug],
    queryFn: () => getMicrogreenProductBySlug(slug),
  });

  const [quantity, setQuantity] = useState(1);

  const handleIncreateQuantity = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    microgreen && (
      <div className="grid grid-cols-1 md:grid-cols-9 gap-5">
        <div className="col-span-3 p-5 mb-5">
          <MicrogreensImage microgreenImages={microgreen.images} />
        </div>
        {/* Microgreen Description */}
        <div className="col-span-4 p-5 mb-5">
          <p className="text-2xl font-bold mb-5">{microgreen.name}</p>
          <p className="text-md mb-5 text-green-700">
            {microgreen?.description[0]}
          </p>
          <p className="text-md mb-5">{microgreen.description[1]}</p>
          <p className="text-2xl font-bold mb-5">₱ {microgreen.price}</p>
          <div>
            <div className="flex gap-5 my-5 items-center">
              <p>Quantity</p>
              <div className="flex gap-5 items-center">
                <Button variant="secondary" onClick={handleDecreaseQuantity}>
                  -
                </Button>
                <p>{quantity}</p>
                <Button
                  className="bg-green-700"
                  onClick={handleIncreateQuantity}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <Button variant="secondary" className="p-5">
                Buy Now
              </Button>
              <Button className="bg-green-700 p-5">Add to Cart</Button>
            </div>
          </div>
        </div>
        <div className="col-span-2 mb-5">
          <MicrogreensSummary
            name={microgreen.name}
            price={microgreen.price}
            quantity={quantity}
          />
        </div>
      </div>
    )
  );
};

export default MicrogreensDetails;
