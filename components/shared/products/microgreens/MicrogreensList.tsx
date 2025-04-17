"use client";

import { getMicrogreenProducts } from "@/lib/actions/ProductActions";
import { Microgreen } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MicrogreensCard from "./MicrogreensCard";

const MicrogreensList = () => {
  const { data: microgreensList } = useQuery({
    queryKey: ["microgreens-list"],
    queryFn: getMicrogreenProducts,
  });
  return (
    <div className="my-10">
      {microgreensList && microgreensList.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
          {microgreensList.map((microgreen: Microgreen) => (
            <MicrogreensCard key={microgreen.slug} microgreen={microgreen} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MicrogreensList;
