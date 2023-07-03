import { useId } from "preact/hooks";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

import ProductSelector from "./ProductVariantSelectoPDP.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 620;
const HEIGHT = 930;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
  );

  return (
    <>
      {/* Code and name */}
      <div class="mt-4 sm:mt-4">
        <h1>
          <span class="font-medium text-2xl">{name}</span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-col gap-2">
          <span class="line-through text-black text-lg">
                        {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          <span class=" text-2xl text-red-600 font-bold">
            {formatPrice(price, offers!.priceCurrency!)}
            {listPrice !== price
              ? (
                <div class="absolute flex justify-center top-0 left-0 z-10 mt-3 ml-2">
                  <span class="rounded-[100px] font-bold bg-black text-white p-1 px-2  text-xs">
                    {Math.floor(price! / listPrice! * 100)}% OFF
                  </span>
                </div>
              )
              : ("")}
          </span>
        </div>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                  price={price ?? 0}
                  discount={price && listPrice ? listPrice - price : 0}
                  name={product.name ?? ""}
                  productGroupId={product.isVariantOf?.productGroupID ?? ""}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>

      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-lg">
          {description && (
            <details open class="border-t  border-b border-black">
              <summary class="cursor-pointer transform transition  duration-700 hover:font-extrabold uppercase">
                Descrição da peça
              </summary>
              <div class="ml-2 py-4 text-base whitespace-pre-line">
                {description}
              </div>
            </details>
          )}
        </span>
      </div>

      <div class="sm:mt-6">
        <span class="text-lg">
          {description && (
            <details class="  border-b border-black">
              <summary class="cursor-pointer  transform transition duration-700   hover:font-extrabold">
                TROCA E DEVOLUÇÃO
              </summary>
              <div class="ml-2 py-4 text-base whitespace-pre-line">
                Visando a sua total satisfação, a BAW Clothing possui uma
                Política de Trocas e Devolução alinhada às mais recentes normas
                do Código de Defesa do Consumidor.

                Nosso objetivo é fornecer um atendimento personalizado, que
                atenda a sua necessidade com excelência e rapidez.

                <a href="https://bawclothing.troquefacil.com.br">
                  Clique aqui e acesse o Troque Fácil para solicitar uma troca
                  ou devolução
                </a>
              </div>
            </details>
          )}
        </span>
      </div>

      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller ?? "1",
          }]}
        />
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
        <div
          id={id}
          class="grid grid-cols-1 pt-4 gap-4 sm:grid-cols-[max-content_40vw_40vw] sm:grid-rows-1 sm:justify-center"
        >
          {/* Image Slider */}
          <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
            <Slider class="carousel gap-6">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item min-w-[100vw] sm:min-w-[40vw]  justify-center"
                >
                  <Image
                    class="w-[620px] h-[930px] object-cover"
                   // sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton
              class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
              disabled
            >
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
              disabled={images.length < 2}
            >
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>

          {/* Dots */}
          <ul class="flex gap-2 sm:justify-start  sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
            <Slider class="flex flex-col carousel overflow-y-scroll  max-h-[800px] gap-6 mt-[100px]">
              {images.map((img, index) => (
                <li class="min-w-[180px] sm:min-w-[100px]  ">
                  <Slider.Dot index={index}>
                    <Image
                      //  style={{ aspectRatio: ASPECT_RATIO }}
                      class="group-disabled:border-base-300 group-disabled:border px-5 w-full h-[180px] "
                      width={160}
                      height={180}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                </li>
              ))}
            </Slider>
          </ul>

          {/* Product Info */}
          <div class="px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}

      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class=" px-10 sm:pb-10">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
