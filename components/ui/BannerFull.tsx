import { useId } from "preact/hooks";
import Image from "deco-sites/std/components/Image.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface BannerCampaing {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;

  image?: {
    /** @description Image for big screens */
    desktop?: LiveImage | undefined;
    /** @description Image for small screens */
    mobile?: LiveImage | undefined;
    /** @description image alt text */
    alt?: string;
    /** @description text to be rendered on top of the image */
    title?: string;
    /** @description text to be rendered on top of the image */
    subtitle?: string;
  };
}

export interface Props {
  page?: LoaderReturnType<ProductListingPage | null>;
  banners?: BannerCampaing[];
}

function BannerFull({ banner }: { banner: BannerCampaing }) {
  const { image } = banner;

  return (
    <div class="w-full px-auto sm:max-w-none sm:m-0 sm:overflow-hidden pr-[40px]">
      <Picture
        preload
        class="col-start-1 col-span-1 row-start-1 row-span-1"
      >

        {image?.mobile
          ? (
            <Source
              src={image?.mobile}
              width={375}
              height={230}
              class=""

            />
          )
          : ("")}
        {image?.desktop
          ? (
            <Source
              src={image.desktop}
              width={960}
              height={600}
              class=""
                          />
          )
          : ("")}

        {image?.desktop
          ? <img class="w-full" src={image.desktop} alt={image.alt} />
          : ("")}
      </Picture>
    </div>
  );
}

/**
 * TODO: run the matcher agains the true URL instead on the breadcrumb.
 * This way we can remove the need for a loader. This can be done on live@1.x
 */
function BannerPLPFull({ page, banners = [] }: Props) {
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
      <BannerFull banner={matching} />
    </>
  );
}

export default BannerPLPFull;
