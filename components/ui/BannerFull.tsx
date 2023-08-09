import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  desktop: LiveImage;
  mobile: LiveImage;
  alt: string;
}

function BannerFull({ alt, desktop, mobile }: Props) {
  return (
    <div class="w-full px-auto lg:max-w-none sm:m-0 lg:overflow-hidden lg:pr-[40px]">
      <Picture
        preload
        class="col-start-1 col-span-1 row-start-1 row-span-1"
      >
        {mobile
          ? (
            <Source
              src={mobile}
              width={2170}
              height={1315}
              class=""
            />
          )
          : ("")}
        {desktop
          ? (
            <Source
              src={desktop}
              width={2170}
              height={1315}
              class=""
            />
          )
          : ("")}

        {desktop ? <img class="w-full" src={desktop} alt={alt} /> : ("")}
      </Picture>
    </div>
  );
}

export default BannerFull;
