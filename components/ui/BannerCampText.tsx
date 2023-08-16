import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
/**
@titleBy matcher
*/
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */

  texts: {
    text?: string;
    /** @description text to be rendered on top of the image */
    subtitle?: string;
  };
}

export interface Props {
  page?: LoaderReturnType<ProductListingPage | null>;
  banners?: Banner[];
}

function BannerUI({ banner }: { banner: Banner }) {
  const { title, subtitle, image } = banner;

  return (
    <>
      <div class="mt-4 sm:mt-6">
        <span class="text-lg">
          {title && (
            <details open class="  border-b border-black">
              <summary class="cursor-pointer transform transition  duration-700 hover:font-extrabold uppercase">
                Descrição da peça
              </summary>
              <div class="ml-2 py-4 text-base whitespace-pre-line">
                {title}
              </div>
            </details>
          )}
        </span>
      </div>
    </>
  );
}

/**
 * TODO: run the matcher agains the true URL instead on the breadcrumb.
 * This way we can remove the need for a loader. This can be done on live@1.x
 */
function CampText({ page, banners = [] }: Props) {
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

  return <BannerUI banner={matching} />;
}

export default CampText;
