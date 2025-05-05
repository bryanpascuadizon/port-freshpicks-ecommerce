"use client";

import { getMicrogreenProductBySlug } from "@/lib/handlers/productHandlers";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MicrogreensImage from "./MicrogreensImage";
import AddToCartButton from "../../cart/AddToCartButton";
import Image from "next/image";
import MicrogreenQuantity from "./MicrogreenQuantity";
import BuyNowButton from "../../cart/BuyNowButton";
import { currencyFormatter } from "@/lib/utils";

const MicrogreensDetails = ({ slug }: { slug: string }) => {
  const { data: microgreen } = useQuery({
    queryKey: ["microgreen-details", slug],
    queryFn: () => getMicrogreenProductBySlug(slug),
  });

  const [isMainImageHovered, setIsMainImageHovered] = useState(false);
  const [currentMainImageIndex, setCurrentMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleMicrogreenQuantity = (type: string) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    }

    if (type === "decrease") {
      if (quantity >= 2) {
        setQuantity(quantity - 1);
      }
    }
  };

  return (
    microgreen && (
      <div className="grid md:grid-cols-9 gap-5 relative">
        <div className="md:col-span-3 p-5 mb-5 flex justify-center">
          <MicrogreensImage
            microgreenImages={microgreen.images}
            setIsMainImageHovered={setIsMainImageHovered}
            setCurrentMainImageIndex={setCurrentMainImageIndex}
          />
        </div>
        <div className="md:col-span-6 p-5 mb-5 relative">
          <p className="text-2xl font-bold mb-5">{microgreen.name}</p>
          <p className="text-base mb-5 text-green">
            {microgreen?.description[0]}
          </p>
          <p className="text-base mb-5">{microgreen.description[1]}</p>
          <p className="text-3xl font-bold mb-5 text-green">
            {currencyFormatter.format(microgreen.price)}
          </p>
          <div className="flex gap-4 w-full mb-5">
            <MicrogreenQuantity
              quantity={quantity}
              handleMicrogreenQuantity={handleMicrogreenQuantity}
            />
          </div>

          <div className="flex gap-4 w-full">
            <AddToCartButton item={microgreen} quantity={quantity} />
            <BuyNowButton item={microgreen} quantity={quantity} />
          </div>

          {/* Zoomed Image */}
          <div
            className={`absolute top-0 left-1 h-full w-full flex justify-center bg-slate-50/70 rounded-sm ${
              isMainImageHovered ? "block" : "hidden"
            }`}
          >
            <Image
              src={microgreen.images[currentMainImageIndex]}
              alt={microgreen.slug}
              width="400"
              height="200"
              className="object-center rounded-sm"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default MicrogreensDetails;
