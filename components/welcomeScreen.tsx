import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";

export default function WelcomeScreen() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-1/2 sm:w-1/3 md:1/4 lg:w-1/5 xl:w-1/6 z-0">
          <AspectRatio ratio={1311 / 1969}>
            <Image
              className="rounded-lg"
              src="/ragusa.jpg"
              alt="dome"
              fill
              objectFit="cover"
            />
          </AspectRatio>
        </div>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl p-6 text-center font-serif z-10 relative">
        Memōriae fights Holocaust denial by telling the authentic stories of
        Holocaust survivors.
      </h1>
    </div>
  );
}
