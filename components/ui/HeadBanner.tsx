import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

function HeadBanner({ srcDesktop, srcMobile, alt }: Props) {
  const id = useId();

  return (
    <div id={id} class="px-4 w-full">
      <div class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full mb-3 mx-auto">
        <img class="w-full" src={srcMobile} alt={alt} />
      </div>
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full gap mb-3 mx-auto">
        <img class="w-full" src={srcDesktop} alt={alt} />
      </div>
    </div>
  );
}

export default HeadBanner;
