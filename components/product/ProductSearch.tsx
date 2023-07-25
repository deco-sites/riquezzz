import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "$store/components/ui/AvatarSearch.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { sendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  colorRed?: boolean;
}

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}
const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 280;
const HEIGHT = 420;

function ProductCard(
  { product, preload, itemListName, colorRed = false }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, installments, availability, seller } = useOffer(
    offers,
  );
  const installmentText = installments?.replace(" sem juros", "").replace(
    ".",
    ",",
  ).replace(" de", "");
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const clickEvent = {
    name: "select_item" as const,
    params: {
      item_list_name: itemListName,
      items: [
        mapProductToAnalyticsItem({
          product,
          price,
          listPrice,
        }),
      ],
    },
  };

  const pppp = variants.find((sku) => sku[0] === "4P");
  const ppp = variants.find((sku) => sku[0] === "3P");
  const pp = variants.find((sku) => sku[0] === "PP");
  const p = variants.find((sku) => sku[0] === "P");
  const m = variants.find((sku) => sku[0] === "M");
  const g = variants.find((sku) => sku[0] === "G");
  const gg = variants.find((sku) => sku[0] === "GG");
  const ggg = variants.find((sku) => sku[0] === "3G");
  const gggg = variants.find((sku) => sku[0] === "4G");

  let newVariants = [pppp, ppp, pp, p, m, g, gg, ggg, gggg];
  newVariants = newVariants.filter((item) => item !== undefined);

  return (
    <div
      class="card card-compact card-bordered rounded-none border-transparent group w-full "
      data-deco="view-product"
      id={`product-card-${productID}`}
      {...sendEventOnClick(clickEvent)}
    >
      <figure class="relative " style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        {/* Wishlist button */}
        <div class="absolute top-0 right-0 z-10">
          <WishlistIcon productGroupID={productGroupID} productID={productID} />
        </div>

        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity w-full opacity-100 group-hover:opacity-0"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity w-full opacity-0 group-hover:opacity-100"
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
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

          {/* SKU Selector */}
          {variants.length > 0
            ? (
              newVariants.length > 0
                ? (
                  <figcaption class="card-body card-actions m-0 absolute bottom-1 left-0 w-full  transition-opacity opacity-0 group-hover/edit:opacity-100 bg-white ">
                    <ul class="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
                      {newVariants.map((item) => (
                        <a href={item?.[1][0]}>
                          <Avatar
                            variant={item?.[1] === url ? "active" : "default"}
                            content={item?.[0]!}
                          />
                        </a>
                      ))}
                    </ul>
                  </figcaption>
                )
                : (
                  <figcaption class="card-body card-actions m-0 absolute bottom-1 left-0 w-full  transition-opacity opacity-0 group-hover/edit:opacity-100 bg-white ">
                    <ul class="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
                      {variants.map(([value, [link]]) => (
                        <a href={link}>
                          <Avatar
                            variant={link === url ? "active" : "default"}
                            content={value}
                          />
                        </a>
                      ))}
                    </ul>
                  </figcaption>
                )
            )
            : ("")}
        </div>
      </figure>
      {/* Prices & Name */}
      <div class=" gap-0 p-0">
        <h2 class="card-title m-0 whitespace-nowrap overflow-hidden  text-black text-[14px] font-normal uppercase">
          {isVariantOf!.name}
        </h2>
        <div class="flex flex-col items-start ">
          <span class="line-through text-[14px]  text-base-300 ">
            {listPrice !== price
              ? (`${formatPrice(listPrice, offers!.priceCurrency!)}`)
              : ("")}
          </span>

          <span
            class={`${colorRed ? "text-red-700 " : ""}text-[14px] font-bold`}
          >
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
