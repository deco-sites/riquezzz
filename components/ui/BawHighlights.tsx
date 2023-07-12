import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Button from "./Button.tsx";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  buttonText: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Highlights({ highlights = [], title }: Props) {
  return (
    <div class="grid grid-cols-1 grid-rows-[48px_1fr] py-10">
      <h2 class="text-center text-transparent">
        <span class="font-medium text-2xl">{title}</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-16 px-10 ">
        {highlights.map(({ href, src, alt, buttonText }) => (
          <div class="bg-[#eaeaea] p-5 text-center">
            <a href={href} class="bg-[#eaeaea] pb-6 group">
              <figure class="relative">
                <img src={src} alt={alt} class="w-full" />
                <Button class="
                bg-white 
                text-black 
                uppercase 
                border-none 
                rounded-none 
                text-xl
                px-8 
                group-hover:bg-white group-hover:scale-125 group-hover:rotate-[-3deg] group-hover:translate-y-[-3rem]">
                  {buttonText || "Comprar agora"}
                </Button>
              </figure>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlights;
