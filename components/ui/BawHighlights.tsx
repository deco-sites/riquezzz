import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Button from "./Button.tsx";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  label: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Highlights({ highlights = [], title }: Props) {
  return (
    <div class="container grid grid-cols-1 grid-rows-[48px_1fr] py-10">
      <h2 class="text-center text-transparent">
        <span class="font-medium text-2xl">{title}</span>
      </h2>

      <Slider class="carousel carousel-center sm:carousel-end gap-6 grid-cols-6 justify-evenly">
        {highlights.map(({ href, src, alt, label }, index) => (
          <Slider.Item
            index={index}
            class="carousel-item first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0 min-w-[300px] col-span-2"
          >
            <a href={href} class="bg-[#eaeaea]">
              <figure>
                <Image
                  class="rounded-[0px]"
                  src={src}
                  alt={alt}
                  width={380}
                  height={530}
                />
                <Button>Comprar agora</Button>
              </figure>
              {
                /* <div class="card-body items-center">
                <h2 class="card-title text-base font-medium">{label}</h2>
              </div> */
              }
            </a>
          </Slider.Item>
        ))}
      </Slider>
    </div>
  );
}

export default Highlights;
