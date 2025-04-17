"use client";

import React, { useState } from "react";
import Image from "next/image";

const MicrogreensImage = ({
  microgreenImages,
}: {
  microgreenImages: string[];
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div>
      <Image
        src={microgreenImages[currentImageIndex]}
        alt="microgreen image"
        height="300"
        width="300"
        priority={true}
        className="rounded-full mb-5 object-cover object-center"
      />
      <div className="flex gap-3">
        {microgreenImages.map((image, index) => (
          <div key={image} onClick={() => setCurrentImageIndex(index)}>
            <Image
              src={image}
              alt="microgreen image"
              height="100"
              width="100"
              priority={true}
              className="rounded-full object-cover object-center min-h-[100] cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MicrogreensImage;
