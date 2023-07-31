import { useId } from "preact/hooks";
import Image from "deco-sites/std/components/Image.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { Video as LiveViedo } from "deco-sites/std/components/types.ts";
import WishlistIcon from "$store/islands/WishlistButton.tsx";

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
  page?: LoaderReturnType<ProductListingPage | null>;
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

  return (
    <div class={`relative overflow-y-hidden `}>
      <div
        class="card card-compact card-bordered rounded-none border-transparent group w-full h-full"
        data-deco="view-product"
      >
        <figure class="relative">
          {
            /* <a href={href}>
        <Image
          class={` flex w-full ${image.secondImg ? "hover:hidden" : ""}`}
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
          width={300}
          height={540}
        />
        {image.secondImg &&
          (
            <Image
              class={` hidden  w-full ${image.secondImg ? "hover:flex" : ""} `}
              loading={lcp ? "eager" : "lazy"}
              src={image.secondImg}
              alt={alt}
              width={300}
              height={540}
            />
          )}
      </a> */
          }

          {
            /* Wishlist button */
          }
          {
            /*
      {listPrice !== price
            ? (
              <div class="absolute flex justify-center top-0 left-0 z-10 mt-3 ml-2">
                <span class="rounded-[100px] font-bold bg-black text-white p-1 px-2  text-xs">
                  {Math.floor(price! / listPrice! * 100)}% OFF
                </span>
              </div>
            )
            : ("")} */
          }
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
              class="absolute  top-0 left-0  transition-opacity w-full opacity-100 group-hover:opacity-0 "
              loading={lcp ? "eager" : "lazy"}
              sizes="(max-width: 640px) 50vw, 20vw"
              decoding="async"
            />
            <Image
              src={image.secondImg ?? desktop!}
              alt={alt}
              width={300}
              height={540}
              class="absolute top-0 left-0  transition-opacity w-full opacity-0 group-hover:opacity-100"
              loading={lcp ? "eager" : "lazy"}
              sizes="(max-width: 640px) 50vw, 20vw"
              decoding="async"
            />
          </a>
        </figure>
      </div>
    </div>
  );
}

function CardsCamps({ banner }: { banner: BannerCampaing }) {
  const { cards } = banner;

  const id = useId();

  return (
    <>
      <div class=" w-full flex flex-row gap-5  h-[1400px] px-[50px] pt-[40px]  ">
        <div
          class={` min-w-[50%] flex `}
        >
          <CardMovie banner={banner} />
        </div>

        <div
          id={id}
          class="flex  w-full flex-row flex-wrap  gap-5 justify-start"
        >
          {cards.images?.map((image, index) => (
            <CardItem
              image={image}
            />
          ))}
        </div>
      </div>

      {/* versão celular */}
      {
        /* <div class="flex lg:hidden container mt-[60px] w-full  md:px-0 ">
        <div
          id={id}
          class="flex w-full items-center gap-3 flex-row justify-center "
        >
          {cards.images?.map((image, index) => (
            <div
              class={` ${SIZE_IMG[image.sizeImgDescktop!]}   ${
                image.secondImg !== undefined
                  ? "order-transparent hover:border-base-200 group overflow-hidden hover:overflow-visible"
                  : ""
              }`}
            >
              <figure
                class={`w-full h-full ${
                  image.secondImg !== undefined ? "relative" : ""
                }`}
              >
                <a
                  href={image.href}
                  class={`${image.secondImg !== undefined ? "contents" : ""}`}
                >
                  <Image
                    class={`w-full ${
                      image.secondImg !== undefined
                        ? "flex transition-opacity opacity-100 md:group-hover:hidden md:group-hover:opacity-0"
                        : ""
                    }`}
                    src={image.desktop}
                    alt={image.alt}
                    width={SIZE_IMG_W[image.sizeImgDescktop!]}
                    height={SIZE_IMG_H[image.sizeImgDescktop!]}
                    decoding="async"
                  />
                  {image.secondImg !== undefined
                    ? (
                      <Image
                        class="transition-opacity opacity-0 md:group-hover:opacity-100"
                        src={image.secondImg}
                        alt={image.alt}
                        width={SIZE_IMG_W[image.sizeImgDescktop!]}
                        height={SIZE_IMG_H[image.sizeImgDescktop!]}
                      />
                    )
                    : ""}
                </a>
              </figure>
            </div>
          ))}
        </div>
      </div> */
      }
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
