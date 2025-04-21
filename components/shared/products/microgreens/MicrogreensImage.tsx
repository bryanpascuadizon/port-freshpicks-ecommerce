"use client";

import React, { useState } from "react";
import Image from "next/image";

const MicrogreensImage = ({
  microgreenImages,
  setIsMainImageHovered,
  setCurrentMainImageIndex,
}: {
  microgreenImages: string[];
  setIsMainImageHovered: (state: boolean) => void;
  setCurrentMainImageIndex: (index: number) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setIsHoveredIndex] = useState(0);

  const handleOnImageHover = (index: number) => {
    setIsHoveredIndex(index);
    setCurrentImageIndex(index);
    setCurrentMainImageIndex(index);
  };

  return (
    <div>
      {/* Main Image */}
      <Image
        src={microgreenImages[currentImageIndex]}
        alt="microgreen image"
        height="300"
        width="300"
        priority={true}
        className="rounded-full mb-5 object-cover object-center cursor-zoom-in"
        onMouseEnter={() => {
          setIsMainImageHovered(true);
          setCurrentMainImageIndex(currentImageIndex);
        }}
        onMouseLeave={() => setIsMainImageHovered(false)}
      />
      <div className="flex gap-3">
        {/* Sub-images */}
        {microgreenImages.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrentImageIndex(index)}
            onMouseEnter={() => handleOnImageHover(index)}
            className={`rounded-full ${
              hoveredIndex === index ? "border-green-700 border-3" : "border-0"
            }`}
          >
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
