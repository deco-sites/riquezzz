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

export interface Card {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  secondImg?: LiveImage;

  price: number;
  qtdportion?: number;
  oldPrice?: number;
  /** @default true */

  colorRed?: boolean;
  name: string;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
}

export interface BannerItem {
  /** @default movie */
  type: "movie" | "image";

  srcMobile: LiveViedo | LiveImage;
  srcDesktop: LiveViedo | LiveImage;
  /**
   * @description Image alt text
   */
  alt?: string;
  /**
   * @description When you click you go to
   */
  href?: string;
  /** @default "Left"  */
  Position: "Left" | "Rigth";
}

export interface BannerCampaing {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description Layout option */

  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };

  cards: {
    images?: Card[];
  };
  bannerFirst?: BannerItem;
}

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;

  banners?: BannerCampaing[];
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

function CardMovie({ banner }: { banner: BannerCampaing }) {
  const { bannerFirst, borderRadius } = banner;
  return (
    <>
      {bannerFirst?.type === "movie"
        ? (
          <section class="w-full px-auto sm:max-w-none sm:m-0 sm:overflow-hidden pr-[40px] ">
            <div>
              <a
                href={bannerFirst?.href}
                class={`overflow-hidden ${
                  RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
              >
                <div class="w-full h-full m-0 p-o b">
                  <video
                    src={bannerFirst?.srcDesktop}
                    alt={bannerFirst?.alt}
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
                    src={bannerFirst?.srcMobile}
                    alt={bannerFirst?.alt}
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
              {bannerFirst?.srcMobile
                ? (
                  <Source
                    src={bannerFirst?.srcMobile}
                    class="w-full h-full"
                    width={335}
                    height={500}
                    media="(max-width: 767px)"
                  />
                )
                : ("")}
              {bannerFirst?.srcDesktop
                ? (
                  <Source
                    src={bannerFirst.srcDesktop}
                    class="w-full h-full"
                    width={960}
                    height={1440}
                    media="(min-width: 767px)"
                  />
                )
                : ("")}

              {bannerFirst?.srcDesktop
                ? (
                  <img
                    class="w-full h-full"
                    src={bannerFirst.srcDesktop}
                    alt={bannerFirst.alt}
                  />
                )
                : ("")}
            </Picture>
          </div>
        )}
    </>
  );
}

function CardItem(
  { image, lcp }: {
    image: Card;
    lcp?: boolean;
  },
) {
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
          </h2>
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
        </div>
      </div>
    </div>
  );
}

function CardsCamps({ banner }: { banner: BannerCampaing }) {
  const { cards } = banner;
  const id = useId();
  return (
    <>
      <div class=" w-full flex flex-col lg:flex-row gap-5 lg:gap-10 px-[15px] pt-[10px] h-[1400px] lg:px-[50px] lg:pt-[40px] justify-center">
        <div
          class={`w-full flex `}
        >
          <CardMovie banner={banner} />
        </div>

        <div
          id={id}
          class="flex flex-row flex-wrap gap-5  px-[15px] lg:gap-10 justify-start"
        >
          {cards.images?.map((image, index) => (
            <CardItem
              image={image}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * TODO: run the matcher agains the true URL instead on the breadcrumb.
 * This way we can remove the need for a loader. This can be done on live@1.x
 */
function BannerFourCards({ page, banners = [] }: Props) {
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

export default BannerFourCards;
