import Image from "deco-sites/std/components/Image.tsx";
import AvatarColor from "$store/components/ui/AvatarColor.tsx";
import AddToCartAvatar from "$store/components/product/AddToCartAvatar.tsx";
import WishlistIcon from "$store/components/wishlist/WishlistButton.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { sendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ProductSelector from "./ProductVariantSelectorPLP.tsx";

import { useState } from "preact/hooks";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  colorRed?: boolean;
}

interface VariantsInterface {
  value: string;
  lvl: number;
  link: string;
  productID?: string;
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
  return `${link.pathname}`;
};

const WIDTH = 280;
const HEIGHT = 420;

function ProductCard(
  { product, preload = false, itemListName, colorRed = false }: Props,
) {
  const [visibleProduct, setVisibleProduct] = useState(product);
  const [similarProducts, setSimilarProducts] = useState(
    product.isSimilarTo?.map((similar: Product) => similar).concat([
      visibleProduct,
    ]) || [],
  );

  const getVariants = (product: Product) => {
    const possibilities = useVariantPossibilities(product);

    const allProperties = (product.isVariantOf?.hasVariant ?? [])
      .flatMap(({ offers = {}, url, productID }) => {
        return (offers.offers?.map((property) => ({
          property,
          url,
          productID,
        })));
      }).map((p) => {
        return ({
          lvl: p?.property.inventoryLevel.value,
          url: p?.url,
          productID: p?.productID,
        });
      });

    const variants = Object.entries(Object.values(possibilities)[0] ?? {}).map(
      (v) => {
        const [value, [link]] = v;
        const lvl = allProperties.find((p) => p.url === link)?.lvl;
        const skuID = allProperties.find((p) => p.url === link)?.productID;
        return { value, link, lvl: lvl as number, productID: skuID };
      },
    );

    const outOfStock = variants.filter((item) => item.lvl > 0).length === 0;
    const pppp = variants.find((sku) => sku.value === "4P");
    const ppp = variants.find((sku) => sku.value === "3P");
    const pp = variants.find((sku) => sku.value === "PP");
    const p = variants.find((sku) => sku.value === "P");
    const m = variants.find((sku) => sku.value === "M");
    const g = variants.find((sku) => sku.value === "G");
    const gg = variants.find((sku) => sku.value === "GG");
    const ggg = variants.find((sku) => sku.value === "3G");
    const gggg = variants.find((sku) => sku.value === "4G");

    let newVariants = [pppp, ppp, pp, p, m, g, gg, ggg, gggg];
    newVariants = newVariants.filter((item) => item !== undefined);
    return { newVariants: newVariants as VariantsInterface[], outOfStock };
  };

  const [productVariants, setProductVariants] = useState(
    getVariants(visibleProduct).newVariants,
  );
  const [outOfStock, setOutOfStock] = useState(false);
  const [offer, setOffer] = useState(useOffer(visibleProduct.offers));
  const [installmentsText, setInstallmentsText] = useState("");

  const updateProduct = (product: Product) => {
    setVisibleProduct(product);
    setOutOfStock(getVariants(product).outOfStock);
    setProductVariants(getVariants(product).newVariants);
    console.log({ productVariants });
  };

  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    isSimilarTo,
  } = visibleProduct;
  const fImages = images?.filter((img) =>
    img.alternateName !== "color-thumbnail"
  );
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = fImages ?? [];
  const { listPrice, price, installments, availability, seller } = offer;
  const installmentText = installments?.replace(" sem juros", "").replace(
    ".",
    ",",
  ).replace(" de", "");

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
        {listPrice !== price
          ? (
            <div class="absolute flex justify-center top-0 left-0 z-10 mt-3 ml-2">
              <span class="rounded-[100px] font-bold bg-black text-white p-1 px-2  text-xs">
                {Math.floor(price! / listPrice! * 100)}% OFF
              </span>
            </div>
          )
          : ("")}

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
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
        <div class="group/edit">
          <figcaption class=" card-body card-actions  p-[10px] absolute bottom-0 left-0 w-full  transition-opacity opacity-0 group-hover:opacity-100 bg-green-600">
            {/* COMPRA */}
            <ul class="flex justify-center items-center  w-full">
              <a class="uppercase w-full text-white text-center font-bold text-xl">
                Compra
              </a>
            </ul>
          </figcaption>
          {/* SKU Selector */}
          <figcaption class="card-body card-actions m-0 p-[10px] absolute bottom-1 left-0 w-full  transition-opacity opacity-0 group-hover/edit:opacity-100 bg-white ">
            <ProductSelector product={product} />
          </figcaption>
        </div>
      </figure>
      {/* Prices & Name */}{" "}
      <div class="mt-2">
        {similarProducts.length > 1
          ? (
            <div class="flex gap-1">
              {similarProducts.map((similar) => {
                const colorImg = similar.image?.find((img) =>
                  img.alternateName === "color-thumbnail"
                )?.url;
                const availability = (similar.offers?.offers.find((of) =>
                  of.seller === seller
                )?.inventoryLevel.value!) > 0;
                if (!colorImg || !availability) {
                  return null;
                }
                return (
                  <div class="w-[20px]">
                    <AvatarColor
                      onClick={(e) => {
                        updateProduct(similar);
                      }}
                      variant={similar.productID === visibleProduct.productID
                        ? "active"
                        : "default"}
                      image={colorImg}
                    />
                  </div>
                );
              })}
            </div>
          )
          : null}
      </div>
      <div class=" flex flex-col p-0 m-0 h-[90px] max-h-[90px] justify-start items-start">
        <h2 class="card-title w-full   text-base-300 text-sm 2xl:text-lg  font-normal uppercase">
          {isVariantOf!.name}
        </h2>
        <div class="flex flex-col  sm:flew-row items-start ">
          <div class="hidden flew-row  items-start sm:flex flex-wrap">
            <span class="text-xs 2xl:text-base font-bold sm:flex hidden  ">
              {installmentText
                ? (installmentText?.length === 8
                  ? (installmentText + ",00" + " / ")
                  : (installmentText?.length === 10
                    ? (installmentText + "0" + " / ")
                    : (installmentText + " / ")))
                : ("")}
            </span>

            <span class="line-through px-1  text-xs 2xl:text-base text-base-300 sm:flex hidden">
              {listPrice !== price
                ? (`${formatPrice(listPrice, offers!.priceCurrency!)} `)
                : ("")}
            </span>
            <span class="text-xs 2xl:text-base  pr-1  font-bold text-black sm:flex hidden">
              {listPrice !== price ? (` /`) : ("")}
            </span>
            <span
              class={`${
                colorRed ? "text-red-700 " : ""
              }text-xs 2xl:text-base font-bold`}
            >
              {price && !outOfStock
                ? (formatPrice(price, offers!.priceCurrency!))
                : ("Produto esgotado")}
            </span>
          </div>

          <div class="flex flew-row  items-start sm:hidden flex-wrap">
            <span class="line-through text-xs 2xl:text-base  text-base-300 px-1 ">
              {listPrice !== price
                ? (formatPrice(listPrice, offers!.priceCurrency!))
                : (" ")}
            </span>

            <span class="text-xs 2xl:text-base  font-bold ">
              {listPrice !== price ? ("/ ") : (" ")}
            </span>
            <span
              class={`${
                colorRed ? "text-red-700 " : ""
              }text-xs 2xl:text-base font-bold pl-1`}
            >
              {price && !outOfStock
                ? (formatPrice(price, offers!.priceCurrency!))
                : (" Produto esgotado")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
