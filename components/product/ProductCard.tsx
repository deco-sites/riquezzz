import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
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
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 280;
const HEIGHT = 420;

function ProductCard({ product, preload, itemListName }: Props) {
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
  return (
    <div
      class="card card-compact card-bordered rounded-none border-transparent group w-full"
      data-deco="view-product"
      id={`product-card-${productID}`}
      {...sendEventOnClick(clickEvent)}
    >
      <figure class="relative " style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        {/* Wishlist button */}
        <div class="absolute top-0 right-0 z-10">
          <WishlistIcon productGroupID={productGroupID} productID={productID} />
        </div>
        <div class="absolute flex justify-center top-0 left-0 z-10 mt-3 ml-2">
          <span class="rounded-[100px] font-bold bg-black text-white p-1 px-2  text-xs">
            {Math.floor(price! / listPrice! * 100)}% OFF
          </span>
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
          <figcaption class="card-body card-actions absolute bottom-0 left-0 w-full mb- transition-opacity opacity-0 group-hover/edit:opacity-100 bg-white">
            {/* SKU Selector */}
            <ul class="flex justify-center items-center gap-2 w-full">
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
        </div>
      </figure>
      {/* Prices & Name */}
      <div class="card-body">
        <h2 class="card-title whitespace-nowrap overflow-hidden  text-base-300 text-base font-normal uppercase">
          {name}
        </h2>
        <div class="flex items-end gap-1">
          <span class="text-base-300 text-base font-bold">
            {installments}
          </span>
        </div>
        <div class="flex items-end gap-1">
          <span class="line-through text-base text-base-300 ">
            {listPrice !== price
              ? (formatPrice(listPrice, offers!.priceCurrency!))
              : ("")}
          </span>
          <span class="text-red-700 text-base font-bold">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
