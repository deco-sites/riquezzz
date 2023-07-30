import { useId } from "preact/hooks";
import Image from "deco-sites/std/components/Image.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
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

export interface BannerCampaing {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;

  bannerM?: {
    /** @default movie */
    /** @description Options  movie | image */

    type?: "movie" | "image";

    srcMovieMobile?: LiveViedo | LiveImage;
    srcMovieDesktop?: LiveViedo | LiveImage;
    /**
     * @description Movie alt text
     */
    altMovie?: string;
    /**
     * @description When you click you go to
     */
    hrefMovie?: string;
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

function BannerMovieImg({ banner }: { banner: BannerCampaing }) {
  const { bannerM, borderRadius } = banner;

  return (
    <>
      {bannerM?.type === "movie"
        ? (
          <section class="w-full px-auto sm:max-w-none sm:m-0 sm:overflow-hidden pr-[40px]">
            <div>
              <a
                href={bannerM?.hrefMovie}
                class={`overflow-hidden ${
                  RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
              >
                <div class="w-full h-full m-0 p-o b">
                  <video
                    src={bannerM?.srcMovieDesktop}
                    alt={bannerM?.altMovie}
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
                    src={bannerM?.srcMovieMobile}
                    alt={bannerM?.altMovie}
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
          <div class="w-full px-auto sm:max-w-none sm:m-0 sm:overflow-hidden pr-[40px]">
            <Picture
              preload
              class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
              {bannerM?.srcMovieMobile
                ? (
                  <Source
                    src={bannerM?.srcMovieMobile}
                    width={375}
                    height={230}
                    media="(max-width: 767px)"
                  />
                )
                : ("")}
              {bannerM?.srcMovieDesktop
                ? (
                  <Source
                    src={bannerM.srcMovieDesktop}
                    width={960}
                    height={600}
                    media="(min-width: 767px)"
                  />
                )
                : ("")}

              {bannerM?.srcMovieDesktop
                ? (
                  <img
                    class="w-full"
                    src={bannerM.srcMovieDesktop}
                    alt={bannerM.altMovie}
                  />
                )
                : ("")}
            </Picture>
          </div>
        )}
    </>
  );
}

function BannerMovie({ page, banners = [] }: Props) {
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
  return <BannerMovieImg banner={matching} />;
}

export default BannerMovie;
