import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  title?: string;
  subtitle?: string;
  srcDesktop: LiveImage;
  showMobile: boolean;
  srcMobile?: LiveImage;
  alt: string;
  href: string;
}

function BannerUI(
  { srcDesktop, srcMobile, alt, title, subtitle, showMobile }: Props,
) {
  const id = useId();
  return (
    <>
      <div id={id} class="sm:px-4 w-full">
        {showMobile
          ? (
            <div class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full  mb-1 mx-auto">
              <img class="w-full" src={srcMobile} alt={alt} />
            </div>
          )
          : ("")}

        <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full mb-2 gap  mx-auto">
          <img class="w-full" src={srcDesktop} alt={alt} />
        </div>
      </div>
      {title !== undefined
        ? (
          <div class="container flex flex-col items-center text-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full max-w-[660px] py-10 sm:gap-5 font-bold">
            {title !== undefined
              ? (
                <h1 class="w-full ">
                  <span class="text-3xl sm:text-5xl uppercase font-medium text-black ">
                    {title}
                  </span>
                </h1>
              )
              : ("")}
            {subtitle !== undefined
              ? (
                <span class="text-xs px-5 text-justify sm:text-center sm:text-sm font-medium text-[#5e5e5e] w-full ">
                  {subtitle}
                </span>
              )
              : ("")}
          </div>
        )
        : ("")}
    </>
  );
}

export default BannerUI;
