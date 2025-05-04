"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessOrder = () => {
  const searchParams = useSearchParams();
  const orderReferenceNumber = searchParams.get("order_reference_number");

  console.log(orderReferenceNumber);
  
  return (
    <div>
      <p>Success!</p>
    </div>
  );
};

export default SuccessOrder;
