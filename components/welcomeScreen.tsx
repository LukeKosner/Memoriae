import React from "react";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio.tsx";

export default function WelcomeScreen() {
  return (
    <div className="flex items-center w-1/2 sm:w-1/3 md:1/4 lg:w-1/5 xl:w-1/6">
      <AspectRatio ratio={1311 / 1969}>
        <Image src="/dome.jpg" alt="dome" fill objectFit="cover" />
      </AspectRatio>
    </div>
  );
}
