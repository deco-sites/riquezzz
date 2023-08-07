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

  mobile: "true" | "false";
  desktop: "true" | "false";
  /** @description desktop otimized image */
  srcdesktop: LiveImage;
  /** @description mobile otimized image */
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

  vertical?: "start" | "center" | "end";
}
export interface Text {
  /** @default 2 */

  mobile: "true" | "false";

  desktop: "true" | "false";
  /** @description Text camp */
  text: string;

  /** @default 1 */
  size: 1 | 2 | 3;
}

export interface BannerMovieIMG {
  /** @default 3 */

  mobile: "true" | "false";
  desktop: "true" | "false";

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
  vertical?: "start" | "center" | "end";
}

export interface Itens {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description Layout option */

  mobile: "true" | "false";

  desktop: "true" | "false";

  ordem: "Card/Movie/Text" | "Text/Movie/card";

  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  horizontal: "start" | "center" | "end";

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
  true: "sm:flex",
  false: "sm:hidden",
};
const MOBILE = {
  true: "flex",
  false: "hidden",
};

const SIZE_FONT = {
  1: "text-[40px] sm:text-[110px]",
  2: "text-[30px] sm:text-[80px]",
  3: "text-[20px] sm:text-[50px]",
};

function CardMovie({ banner }: { banner: Itens }) {
  const { cards, borderRadius } = banner;
  return (
    <>
      {cards.banner?.type === "movie"
        ? (
          <section
            class={`  sm:max-w-none sm:m-0 sm:overflow-hidden  ${
              DESKTOP[cards.banner!.desktop!]
            }  ${MOBILE[cards.banner!.mobile!]}`}
          >
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
          <div
            class={`grid grid-cols-1 grid-rows-1 ${
              DESKTOP[cards.banner!.desktop!]
            }  ${MOBILE[cards.banner!.mobile!]}`}
          >
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
      class={`flex flex-col justify-center font-bold w-full  ${
        DESKTOP[text.desktop!]
      }  ${MOBILE[text.mobile!]} `}
    >
      <h1
        class={`sm:-rotate-90 ${
          SIZE_FONT[text.size!]
        } w-full text-center uppercase font-extrabold text-gray-700`}
      >
        {text.text}
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
  } = image;
  const priceStr = image.price + "";

  return (
    <div
      class={`  card card-compact card-bordered rounded-none border-transparent group ${
        DESKTOP[desktop!]
      }  ${MOBILE[mobile!]} ${HORIZONTAL[vertical!]}  `}
      data-deco="view-product"
    >
      <div class={`relative ${SIZE_IMG[size!]} overflow-y-hidden`}>
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
  const { cards, ordem } = banner;
  const { productCard, text } = cards;
  const id = useId();
  return (
    <>
      {ordem === "Card/Movie/Text"
        ? (
          <div
            class={`flex flex-col lg:flex-row gap-5 lg:gap-10 px-[25px] sm:px-[25px] pt-[10px] max-h-[1100] lg:px-[50px] lg:pt-[40px] ${
              HORIZONTAL[banner.horizontal!]
            } `}
          >
            {productCard !== undefined
              ? (
                <div
                  id={id}
                  class="flex flex-row flex-wrap gap-5   lg:gap-10 justify-start"
                >
                  {productCard?.map((image, index) => (
                    <CardItem
                      image={image}
                    />
                  ))}
                  {cards.banner !== undefined
                    ? <CardMovie banner={banner} />
                    : ("")}
                </div>
              )
              : ("")}

            {text !== undefined
              ? (
                <div
                  id={id}
                  class={` flex`}
                >
                  <TextCamp
                    text={text}
                  />
                </div>
              )
              : ("")}
          </div>
        )
        : (
          <div
            class={`w-full flex flex-col lg:flex-row gap-5 lg:gap-10 px-[15px] sm:px-[15px] pt-[10px] max-h-[1100] lg:px-[50px] lg:pt-[40px] ${
              HORIZONTAL[banner.horizontal!]
            } `}
          >
            {text !== undefined
              ? (
                <div
                  id={id}
                  class={` flex`}
                >
                  <TextCamp
                    text={text}
                  />
                </div>
              )
              : ("")}

            {productCard !== undefined
              ? (
                <div
                  id={id}
                  class="flex flex-row flex-wrap gap-5  lg:gap-10 justify-start"
                >
                  {cards.banner !== undefined
                    ? <CardMovie banner={banner} />
                    : ("")}
                  {productCard?.map((image, index) => (
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
