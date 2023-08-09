import { useId } from "preact/hooks";
import Image from "deco-sites/std/components/Image.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { Video as LiveViedo } from "deco-sites/std/components/types.ts";

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export type MD =
  | "sim"
  | "nao";

export interface Product {
  mobile: MD;
  desktop: MD;
  srcdesktop: LiveImage;
  secondImg?: LiveImage;

  price?: number;

  qtdportion?: number;

  oldPrice?: number;

  colorRed?: boolean;
  name: string;
  alt: string;
  href: string;
  size: 1 | 2 | 3;

  vertical?: "start" | "center" | "end";
}
export interface Text {
  mobile: MD;

  desktop: MD;

  text?: string;

  size: 1 | 2 | 3;
}

export interface BannerMovieIMG {
  mobile: MD;
  desktop: MD;

  type?: "movie" | "image";

  srcMobile?: LiveViedo;
  srcDesktop?: LiveViedo;
  srcMobileIMG?: LiveImage;
  srcDesktopIMG?: LiveImage;

  alt?: string;

  href?: string;
  size: 1 | 2 | 3;
  vertical?: "start" | "center" | "end";
}

export interface Props {
  ordem: "Card/Movie/Text" | "Text/Movie/card";

  borderRadius: {
    mobile?: BorderRadius;
    desktop?: BorderRadius;
  };
  horizontal: "start" | "center" | "end";

  cards?: {
    productCard?: Product[];
    banner?: BannerMovieIMG;
    text?: Text;
  };
}

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

const SIZE_IMG = {
  1: "h-[330px] w-[150px] sm:h-[1100px] sm:w-[620px]",
  2: "h-[330px] w-[150px] sm:h-[760px] sm:w-[510px]",
  3: "h-[330px] w-[150px] sm:w-[400px]",
};

const HORIZONTAL = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

const SIZE_IMG_H = {
  1: 1100,
  2: 760,
  3: 600,
};
const SIZE_IMG_W = {
  1: 620,
  2: 510,
  3: 400,
};
const DESKTOP = {
  sim: "sm:flex",
  nao: "sm:hidden",
};
const MOBILE = {
  sim: "flex",
  nao: "hidden",
};

const SIZE_FONT = {
  1: "text-[40px] sm:text-[110px]",
  2: "text-[30px] sm:text-[80px]",
  3: "text-[20px] sm:text-[50px]",
};

function CardMovie(
  { banner, borderRadius }: {
    banner: BannerMovieIMG;
    borderRadius: {
      mobile?: BorderRadius;
      desktop?: BorderRadius;
    };
  },
) {
  const id = useId();

  return (
    <>
      {banner?.type === "movie"
        ? (
          <section
            id={id}
            class={`  sm:max-w-none sm:m-0 sm:overflow-hidden  ${
              DESKTOP[banner!.desktop!]
            }  ${MOBILE[banner!.mobile!]}`}
          >
            <div>
              <a
                href={banner?.href}
                class={`overflow-hidden ${
                  RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
              >
                <div
                  class={` m-0 p-0  ${SIZE_IMG[banner!.size!]}`}
                >
                  <video
                    src={banner?.srcDesktop}
                    alt={banner?.alt}
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    webkit-playsinline
                    x5-playsinline
                    playsInline
                    class="hidden w-full h-full sm:inline-block"
                  >
                    Video não suportado!
                  </video>
                  <video
                    src={banner?.srcMobile}
                    alt={banner?.alt}
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    webkit-playsinline
                    x5-playsinline
                    playsInline
                    class="sm:hidden w-full h-full inline-block"
                  >
                    Video não suportado!
                  </video>
                </div>
              </a>
            </div>
          </section>
        )
        : (
          <div
            id={id}
            class={`grid grid-cols-1 grid-rows-1 ${
              DESKTOP[banner!.desktop!]
            }  ${MOBILE[banner!.mobile!]}`}
          >
            <Picture
              preload
              class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
              {banner?.srcMobileIMG
                ? (
                  <Source
                    src={banner?.srcMobileIMG}
                    class={` m-0 p-0  ${SIZE_IMG[banner!.size!]}`}
                    width={335}
                    height={500}
                    media="(max-width: 767px)"
                  />
                )
                : ("")}
              {banner?.srcDesktopIMG
                ? (
                  <Source
                    src={banner.srcDesktopIMG}
                    class={` m-0 p-0  ${SIZE_IMG[banner!.size!]}`}
                    width={960}
                    height={1440}
                    media="(min-width: 767px)"
                  />
                )
                : ("")}

              {banner?.srcDesktop
                ? (
                  <img
                    class={` m-0 p-0  ${SIZE_IMG[banner!.size!]}`}
                    src={banner.srcDesktopIMG}
                    alt={banner.alt}
                  />
                )
                : ("")}
            </Picture>
          </div>
        )}
    </>
  );
}
function TextCamp({ text }: { text: Text }) {
  const id = useId();

  return (
    <div
      id={id}
      class={`flex flex-col justify-center font-bold w-full  ${
        DESKTOP[text.desktop!]
      }  ${MOBILE[text.mobile!]} `}
    >
      <h1
        class={`sm:-rotate-90 ${
          SIZE_FONT[text.size!]
        } w-full text-center uppercase font-extrabold text-gray-700`}
      >
        {text.text !== undefined ? (text.text) : ("")}
      </h1>
    </div>
  );
}
function CardItem({ image, lcp }: { image: Product; lcp?: boolean }) {
  const {
    alt,
    srcdesktop,
    desktop,
    mobile,
    href,
    size,
    vertical,
    price,
    oldPrice,
    colorRed,
    name,
    qtdportion,
    secondImg,
  } = image;
  const priceStr = image.price + "";
  const id = useId();

  return (
    <div
      id={id}
      class={`  card card-compact card-bordered rounded-none border-transparent group    ${
        HORIZONTAL[vertical!]
      }  `}
      data-deco="view-product"
    >
      <div class={`relative ${SIZE_IMG[size!]} `}>
        <figure
          class="relative"
          style={{ aspectRatio: `${SIZE_IMG_W[size!]} / ${SIZE_IMG_H[size!]}` }}
        >
          <a
            href={href}
            aria-label="view product"
            class="contents"
          >
            <Image
              src={srcdesktop}
              alt={alt}
              width={510}
              height={760}
              class="absolute top-0 left-0  transition-opacity w-full max-h-[760px]  object-cover opacity-100 group-hover:opacity-0 "
              loading={lcp ? "eager" : "lazy"}
              sizes="(max-width: 640px) "
              decoding="async"
            />
            <Image
              src={image.secondImg ?? srcdesktop!}
              alt={alt}
              width={510}
              height={760}
              class=" absolute top-0 left-0  transition-opacity w-full max-h-[760px] object-cover opacity-0 group-hover:opacity-100"
              loading={lcp ? "eager" : "lazy"}
              sizes="(max-width: 640px) "
              decoding="async"
            />
          </a>
          <div class="group/edit">
            <figcaption class=" card-body card-actions absolute bottom-0 left-0 w-full  transition-opacity opacity-0 group-hover:opacity-100 bg-green-600">
              {/* COMPRA */}
              <ul class="flex justify-center items-center  w-full">
                <a class="uppercase w-full text-white text-center font-bold text-xl">
                  Compra
                </a>
              </ul>
            </figcaption>
          </div>
        </figure>
        <div class="flex flex-col p-0 m-0 h-[90px] max-h-[90px] justify-start items-start">
          <h2 class="card-title w-full   text-base-300 text-sm 2xl:text-lg  font-normal uppercase">
            {name}
          </h2>
          {price !== undefined
            ? (
              <div class="flex flex-col  sm:flew-row items-start ">
                <div class=" flew-row  items-start flex flex-wrap">
                  {qtdportion !== undefined
                    ? (
                      <span
                        class={`text-xs 2xl:text-base font-bold pl-1`}
                      >
                        {qtdportion + "x R$" +
                          (price / qtdportion!).toFixed(2) +
                          " / "}
                      </span>
                    )
                    : ("")}
                  {oldPrice !== price
                    ? (
                      <span class="line-through text-xs 2xl:text-base  text-base-300 px-1 ">
                        R$ {oldPrice !== price
                          ? (priceStr.length <= 3
                            ? (oldPrice + ",00 ")
                            : (priceStr?.length <= 5
                              ? (oldPrice + "0 ")
                              : (oldPrice)))
                          : (" ")}
                      </span>
                    )
                    : ("")}

                  <span class="text-xs 2xl:text-base font-bold px-1">
                    {oldPrice !== price ? (" / ") : (" ")}
                  </span>
                  <span
                    class={`${
                      colorRed! ? "text-red-700 " : ""
                    }text-xs 2xl:text-base font-bold pl-1`}
                  >
                    R$ {priceStr.length <= 3
                      ? (price + ",00")
                      : (priceStr?.length <= 5 ? (price + "0") : (price))}
                  </span>
                </div>
              </div>
            )
            : ("")}
        </div>
      </div>
    </div>
  );
}

function CardsCamps(
  { cards, ordem, horizontal, borderRadius }: Props,
) {
  const id = useId();
  return (
    <>
      {ordem === "Card/Movie/Text"
        ? (
          <div
            class={`flex flex-col lg:flex-row gap-5 lg:gap-0 px-[25px] sm:px-[25px] pt-[10px] max-h-[1100] lg:px-[50px] lg:pt-[40px] ${
              HORIZONTAL[horizontal!]
            } `}
          >
            {cards?.productCard! !== undefined
              ? (
                <div
                  id={id}
                  class="flex flex-row flex-wrap gap-5   lg:gap-20 justify-start"
                >
                  {cards?.productCard?.map((image, index) => (
                    <CardItem
                      image={image}
                    />
                  ))}
                  {cards?.banner !== undefined
                    ? (
                      <CardMovie
                        banner={cards?.banner!}
                        borderRadius={borderRadius}
                      />
                    )
                    : ("")}
                </div>
              )
              : ("")}

            {cards?.text !== undefined
              ? (
                <div
                  id={id}
                  class={` flex`}
                >
                  <TextCamp
                    text={cards?.text!}
                  />
                </div>
              )
              : ("")}
          </div>
        )
        : (
          <div
            class={`w-full flex flex-col lg:flex-row gap-5 lg:gap-10 px-[15px] sm:px-[15px] pt-[10px] max-h-[1100] lg:px-[50px] lg:pt-[40px] ${
              HORIZONTAL[horizontal!]
            } `}
          >
            {cards?.text !== undefined
              ? (
                <div
                  id={id}
                  class={` flex`}
                >
                  <TextCamp
                    text={cards?.text!}
                  />
                </div>
              )
              : ("")}

            {cards?.productCard !== undefined
              ? (
                <div
                  id={id}
                  class="flex flex-row flex-wrap gap-5  lg:gap-20 justify-start"
                >
                  {cards?.banner !== undefined
                    ? (
                      <CardMovie
                        banner={cards?.banner!}
                        borderRadius={borderRadius}
                      />
                    )
                    : ("")}
                  {cards?.productCard?.map((image, index) => (
                    <CardItem
                      image={image}
                    />
                  ))}
                </div>
              )
              : ("")}
          </div>
        )}
    </>
  );
}

export default CardsCamps;
