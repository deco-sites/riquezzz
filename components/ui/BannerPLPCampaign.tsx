import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface BannerCampaing {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** @description text to be rendered on top of the image */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop?: LiveImage | undefined;
    /** @description Image for small screens */
    mobile?: LiveImage | undefined;
    /** @description image alt text */
    alt?: string;
  };
  movie: {
    srcMovieMobile?: LiveImage;
    srcMovieDesktop?: LiveImage;
    /**
     * @description Movie alt text
     */
    altMovie?: string;
    /**
     * @description When you click you go to
     */
    hrefMovie?: string;
  };

  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 4 | 6 | 8;
  };
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
}
export interface Props {
  page?: LoaderReturnType<ProductListingPage | null>;
  banners?: BannerCampaing[];
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

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

function BannerUI({ banner }: { banner: BannerCampaing }) {
  const { title, subtitle, image } = banner;

  return (
    <>
      <div class="grid grid-cols-1 grid-rows-1">
        <Picture
          preload
          class="col-start-1 col-span-1 row-start-1 row-span-1"
        >
          {image?.mobile
            ? (
              <Source
                src={image?.mobile}
                width={360}
                height={120}
                media="(max-width: 767px)"
              />
            )
            : ("")}
          {image?.desktop
            ? (
              <Source
                src={image.desktop}
                width={1440}
                height={200}
                media="(min-width: 767px)"
              />
            )
            : ("")}

          {image?.desktop
            ? <img class="w-full" src={image.desktop} alt={image.alt} />
            : ("")}
        </Picture>
      </div>
      <div class="container flex flex-col items-center text-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full max-w-[660px] py-10 sm:gap-5 font-bold">
        <h1 class="w-full ">
          <span class="text-3xl sm:text-5xl uppercase font-medium text-black ">
            {title}
          </span>
        </h1>

        <span class="text-xs px-5 text-justify sm:text-center sm:text-sm font-medium text-[#5e5e5e] w-full ">
          {subtitle}
        </span>
      </div>
    </>
  );
}

function BannnerGrid({ banner }: { banner: BannerCampaing }) {
  const { movie, borderRadius } = banner;

  return (
    <section class="w-full px-auto sm:max-w-none sm:m-0 sm:overflow-hidden">
      <div>
        <a
          href={movie.hrefMovie}
          class={`overflow-hidden ${
            RADIUS_MOBILE[borderRadius.mobile ?? "none"]
          } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
        >
          <div class="w-full h-full m-0 p-o b">
            <video
              src={movie.srcMovieDesktop}
              alt={movie.altMovie}
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
              src={movie.srcMovieMobile}
              alt={movie.altMovie}
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
  );
}

/**
 * TODO: run the matcher agains the true URL instead on the breadcrumb.
 * This way we can remove the need for a loader. This can be done on live@1.x
 */
function BannerCompanie({ page, banners = [] }: Props) {
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
    <BannnerGrid banner={matching} />
    <BannerUI banner={matching} />
  </>)

}

export default BannerCompanie;