import { useId } from "preact/hooks";
import Image from "deco-sites/std/components/Image.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { Video as LiveViedo } from "deco-sites/std/components/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Product {
  /** @default 1 */
  position?: 1 | 2 | 3;
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  secondImg?: LiveImage;

  price?: number;

  qtdportion?: number;

  oldPrice?: number;
  /** @default true */

  colorRed?: boolean;
  name: string;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
  /** @default 1 */
  size: 1 | 2 | 3;
  horizontal?: "start" | "center" | "end";
  vertical?: "start" | "center" | "end";
}
export interface Text {
  /** @default 2 */

  position?: 1 | 2 | 3;
  /** @description Text camp */
  text: string;

  /** @description when user clicks on the image, go to this link */
  href?: string;
  /** @default 1 */
  size: 1 | 2 | 3;

  vertical?: "start" | "center" | "end";
}

export interface BannerMovieIMG {
  /** @default 3 */
  position?: 1 | 2 | 3;
  type?: "movie" | "image";

  srcMobile?: LiveViedo | LiveImage;
  srcDesktop?: LiveViedo | LiveImage;
  /**
   * @description Image alt text
   */
  alt?: string;
  /**
   * @description When you click you go to
   */
  href?: string;
  /** @default 1 */
  size: 1 | 2 | 3;
  horizontal?: "start" | "center" | "end";
  vertical?: "start" | "center" | "end";
}

export interface Itens {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description Layout option */

  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  horizontal?: "start" | "center" | "end";
  vertical?: "start" | "center" | "end";
  cards: {
    productCard?: Product[];
    banner?: BannerMovieIMG;
    text?: Text;
  };
}

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;

  banners?: Itens[];
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
  1: "h-[1100px] w-[620px]",
  2: "h-[800px] w-[510px]",
  3: "w-[400px]",
};

const HORIZONTAL = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};
const VERTICAL = {
  start: "align-start",
  center: "align-center",
  end: "align-end",
};

const SIZE_IMG_H = {
  1: 1100,
  2: 800,
};
const SIZE_IMG_W = {
  1: 620,
  2: 510,
  3: 400,
};

const SIZE_FONT = {
  1: "sm:text-[110px]",
  2: "sm:text-[110px]",
  3: "sm:text-[110px]",
};

function CardMovie({ banner }: { banner: Itens }) {
  const { cards, borderRadius } = banner;
  return (
    <>
      {cards.banner?.type === "movie"
        ? (
          <section class="w-full px-auto sm:max-w-none sm:m-0 sm:overflow-hidden pr-[40px] ">
            <div>
              <a
                href={cards.banner?.href}
                class={`overflow-hidden ${
                  RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
              >
                <div
                  class={` m-0 p-0 b ${SIZE_IMG[cards.banner!.size!]}`}
                >
                  <video
                    src={cards.banner?.srcDesktop}
                    alt={cards.banner?.alt}
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
                    src={cards.banner?.srcMobile}
                    alt={cards.banner?.alt}
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
          <div class="grid grid-cols-1 grid-rows-1">
            <Picture
              preload
              class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
              {cards.banner?.srcMobile
                ? (
                  <Source
                    src={cards.banner?.srcMobile}
                    class={` m-0 p-0 b ${SIZE_IMG[cards.banner!.size!]}`}
                    width={335}
                    height={500}
                    media="(max-width: 767px)"
                  />
                )
                : ("")}
              {cards.banner?.srcDesktop
                ? (
                  <Source
                    src={cards.banner.srcDesktop}
                    class={` m-0 p-0 b ${SIZE_IMG[cards.banner!.size!]}`}
                    width={960}
                    height={1440}
                    media="(min-width: 767px)"
                  />
                )
                : ("")}

              {cards.banner?.srcDesktop
                ? (
                  <img
                    class={` m-0 p-0 b ${SIZE_IMG[cards.banner!.size!]}`}
                    src={cards.banner.srcDesktop}
                    alt={cards.banner.alt}
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
  return (
    <div
      class={`flex flex-col ${
        HORIZONTAL[text.vertical!]
      } w-full max-h-[800px] font-bold`}
    >
      <h1 class="w-full -rotate-90  sm:text-[110px] uppercase font-extrabold text-gray-700">
        {text.text}
      </h1>
    </div>
  );
}
function CardItem({ image, lcp }: { image: Product; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;
  const priceStr = image.price + "";

  return (
    <div
      class="card card-compact card-bordered rounded-none border-transparent group "
      data-deco="view-product"
    >
      <div class={`relative  w-[150px] lg:w-[350px] overflow-y-hidden`}>
        <figure class="relative" style={{ aspectRatio: `350/540` }}>
          <a
            href={href}
            aria-label="view product"
            class="contents"
          >
            <Image
              src={desktop}
              alt={alt}
              width={300}
              height={540}
              class="absolute top-0 left-0  transition-opacity w-full opacity-100 group-hover:opacity-0 "
              loading={lcp ? "eager" : "lazy"}
              sizes="(max-width: 640px) 50vw, 20vw"
              decoding="async"
            />
            <Image
              src={image.secondImg ?? desktop!}
              alt={alt}
              width={300}
              height={540}
              class=" absolute top-0 left-0  transition-opacity w-full opacity-0 group-hover:opacity-100"
              loading={lcp ? "eager" : "lazy"}
              sizes="(max-width: 640px) 50vw, 20vw"
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
        <div class=" flex flex-col p-0 m-0 h-[90px] max-h-[90px] justify-start items-start">
          <h2 class="card-title w-full   text-base-300 text-sm 2xl:text-lg  font-normal uppercase">
            {image.name}
          </h2>{" "}
          {image.price !== undefined
            ? (
              <div class="flex flex-col  sm:flew-row items-start ">
                <div class=" flew-row  items-start flex flex-wrap">
                  {image.qtdportion !== undefined
                    ? (
                      <span
                        class={`text-xs 2xl:text-base font-bold pl-1`}
                      >
                        {image.qtdportion + "x R$" +
                          image.price / image.qtdportion! +
                          " / "}
                      </span>
                    )
                    : ("")}
                  {image.oldPrice !== image.price
                    ? (
                      <span class="line-through text-xs 2xl:text-base  text-base-300 px-1 ">
                        R$ {image.oldPrice !== image.price
                          ? (priceStr.length === 3
                            ? (image.oldPrice + ",00 ")
                            : (priceStr?.length === 5
                              ? (image.oldPrice + "0 ")
                              : (image.oldPrice)))
                          : (" ")}
                      </span>
                    )
                    : ("")}

                  <span class="text-xs 2xl:text-base font-bold px-1">
                    {image.oldPrice !== image.price ? (" / ") : (" ")}
                  </span>
                  <span
                    class={`${
                      image.colorRed! ? "text-red-700 " : ""
                    }text-xs 2xl:text-base font-bold pl-1`}
                  >
                    R$ {priceStr.length === 3
                      ? (image.price + ",00")
                      : (priceStr?.length === 5
                        ? (image.price + "0")
                        : (image.price))}
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

function CardsCamps({ banner }: { banner: Itens }) {
  const { cards } = banner;
  const { productCard, text } = cards;
  const id = useId();
  return (
    <>
      <div class=" w-full flex flex-col lg:flex-row gap-5 lg:gap-10 px-[15px] pt-[10px] max-h-[1100] lg:px-[50px] lg:pt-[40px] justify-center">
        {cards.banner !== undefined
          ? (
            <div
              class={`w-full flex `}
            >
              <CardMovie banner={banner} />
            </div>
          )
          : ("")}

        {productCard !== undefined
          ? (
            <div
              id={id}
              class="flex flex-row flex-wrap gap-5  px-[15px] lg:gap-10 justify-start"
            >
              {productCard?.map((image, index) => (
                <CardItem
                  image={image}
                />
              ))}
            </div>
          )
          : ("")}

        {text !== undefined
          ? (
            <div
              id={id}
              class={`w-full flex `}
            >
              <TextCamp
                text={text}
              />
            </div>
          )
          : ("")}
      </div>
    </>
  );
}

/**
 * TODO: run the matcher agains the true URL instead on the breadcrumb.
 * This way we can remove the need for a loader. This can be done on live@1.x
 */
function BannerCardPosition({ page, banners = [] }: Props) {
  if (!page || page.breadcrumb.itemListElement.length === 0) {
    return null;
  }

  const { item: canonical } = page
    .breadcrumb
    .itemListElement
    .reduce((curr, acc) => curr.position > acc.position ? curr : acc);

  const matching = banners.find(({ matcher }) =>
    new RegExp(matcher).test(canonical)
  );

  if (!matching) {
    return null;
  }
  return (
    <>
      <CardsCamps banner={matching} />
    </>
  );
}

export default BannerCardPosition;
