import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Props {
  desktop: LiveImage;
  alt: string;
  preload?: boolean;
}

function BannerFull({ alt, desktop, preload }: Props) {
  return (
    <div class="w-full px-auto lg:max-w-none sm:m-0 lg:overflow-hidden lg:pr-[40px]">
      <div class="flex">
        <Picture
          preload
          class="col-start-1 col-span-1 row-start-1 row-span-1"
        >
          {desktop
            ? (
              <Source
                src={desktop}
                width={1920}
                height={1000}
                class="flex"
              />
            )
            : ("")}
          {desktop
            ? (
              <Image
                class="w-full"
                loading={preload ? "eager" : "lazy"}
                width={1920}
                height={1000}
                preload={preload}
                src={desktop}
                alt={alt}
              />
            )
            : ("")}
        </Picture>
      </div>
    </div>
  );
}

export default BannerFull;
