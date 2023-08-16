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
import ProductReviews from "deco-sites/riquezzz/components/product/ProductReviews.tsx";
import { ResponseReviews } from "$store/loaders/reviewsandratings.ts";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  // reviews: LoaderReturnType<ResponseReviews | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
  appKey: string;
  appToken: string;
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
        <span class="font-medium text-2xl text-black  ">
          Página não encontrada
        </span>
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
      <div class="mt-1 lg:mt-4">
        <h1>
          <span class="font-bold lg:font-medium text-2xl text-black">
            {product.isVariantOf!.name}
          </span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-1 lg:mt-4">
        <div class="flex flex-col gap-0 lg:gap-2">
          <span class="line-through text-black text-lg">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          <div class="flex items-center">
            <span class=" text-2xl text-red-600 font-bold">
              {formatPrice(price, offers!.priceCurrency!)}
            </span>
            {listPrice !== price
              ? (
                <span class="rounded-[100px] font-bold bg-black text-white p-1 lg:px-2  text-xs  ml-2 p-2">
                  {Math.floor(price! / listPrice! * 100)}% OFF
                </span>
              )
              : ("")}
          </div>
        </div>
      </div>
      {/* Sku Selector */}
      <div class="mt-2 mb-2 lg:mb-0 lg:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-10 flex flex-col gap-2">
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
            <details open class="  border-b border-black">
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

function imgZoom() {
  const img = document.getElementById("imgzom");
  const box = document.getElementById("box");

  box!.addEventListener("mousemove", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    img!.style.transformOrigin = `${x}px ${y}px`;
    img!.style.transform = "scale(2)";
  });
  box!.addEventListener("mouseleave", () => {
    img!.style.transformOrigin = "center center";
    img!.style.transform = "scale(1)";
  });
}

function Details({
  page,
  variant,
  appKey,
  appToken,
}: {
  page: ProductDetailsPage;
  variant: Variant;
  appKey: string;
  appToken: string;
}) {
  const {
    breadcrumbList,
    product,
  } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  if (variant === "slider") {
    return (
      <>
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
        <div
          id={id}
          class="grid grid-cols-1 pt-2 lg:pt-4 gap-2 lg:gap-4 lg:grid-cols-[max-content_40vw_40vw] grid-rows-1 justify-center"
        >
          {/* Image Slider */}
          <div class="relative lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:max-h-[930px]">
            <Slider class="carousel gap-2 lg:gap-6 min-w-[40vw] sm:max-w-[40vw]">
              {images.filter((img) => img.alternateName !== "color-thumbnail")
                .map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item min-w-[40vw]  lg:min-w-[40vw]  justify-center"
                  >
                    <div
                      id="box"
                      class="flex items-center justify-center m-0 lg:min-h-[930px] overflow-hidden"
                    >
                      <Image
                        class="w-[335px] h-[480px] lg:w-[620px] lg:h-[930px] object-cover  origin-center "
                        // sizes="(max-width: 640px) 100vw, 40vw"
                        style={{ aspectRatio: ASPECT_RATIO }}
                        src={img.url!}
                        alt={img.alternateName}
                        width={WIDTH}
                        height={HEIGHT}
                        // Preload LCP image for better web vitals
                        preload={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        id="imgzom"
                      />
                      <script
                        dangerouslySetInnerHTML={{
                          __html: `(${imgZoom.toString()})()`,
                        }}
                      />
                    </div>
                  </Slider.Item>
                ))}
            </Slider>

            <Slider.PrevButton
              class=" hidden lg:flex no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
              disabled
            >
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>

            <Slider.NextButton
              class=" hidden lg:flex no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
              disabled={images.length < 2}
            >
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>

          {/* Dots */}
          <ul class="hidden lg:flex gap-2 justify-start px-0 flex-col col-start-1 col-span-1 row-start-1">
            <Slider class="flex flex-col carousel overflow-y-scroll  max-h-[800px] gap-6 lg:mt-[100px]">
              {images.filter((img) => img.alternateName !== "color-thumbnail")
                .map((img, index) => (
                  <li class="min-w-[180px]  max-w-[180px]  ">
                    <Slider.Dot index={index}>
                      <Image
                        //  style={{ aspectRatio: ASPECT_RATIO }}
                        id="zom"
                        class="group-disabled:border-base-300 group-disabled:border  w-full h-[180px] "
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
          <div class="px-4 sm:pr-0 sm:pl-6 lg:col-start-3 lg:col-span-1 lg:row-start-1">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>

        <ProductReviews productID={page.product.productID} />
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

function ProductDetails(
  { page, variant: maybeVar = "auto", appKey, appToken }: Props,
) {
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
    <div class="px-5  lg:px-10 lg:pb-10">
      {page
        ? (
          <Details
            page={page}
            variant={variant}
            appKey={appKey}
            appToken={appToken}
          />
        )
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;
