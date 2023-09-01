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
import type { Product } from "deco-sites/std/commerce/types.ts";
import ProductSelector from "./ProductVariantSelectoPDP.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import WishlistIcon from "$store/components/wishlist/WishlistButton.tsx";
import ShareButton from "$store/islands/ShareButton.tsx";

import ProductReviews from "deco-sites/riquezzz/components/product/ProductReviews.tsx";
import { ResponseReviews } from "$store/loaders/reviewsandratings.ts";
import type { SectionProps } from "$live/mod.ts";
import { default as reviewsLoader } from "deco-sites/riquezzz/loaders/reviewsandratings.ts";
import SizebayButtons from "deco-sites/riquezzz/components/product/SizebayButtons.tsx";

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

export async function loader(
  { page, variant }: Props,
  _req: Request,
) {
  let reviews = {} as ResponseReviews;
  let SID = "";
  let showButtons: string | null = null;
  let buttonsUrl: (mode: string) => string = (a: string) => "a";
  let permaLink = "";
  let recommendedSize: string | null = null;

  if (page?.product.url?.includes("http://localhost:8000/")) {
    // to work in local
    permaLink = page?.product.url?.replace(
      "http://localhost:8000",
      "https://www.bawclothing.com.br",
    ).split("?")[0];
  } else if (page?.product.url?.includes("https://riquezzz.deco.site/")) {
    permaLink = page?.product.url?.replace(
      "https://riquezzz.deco.site",
      "https://www.bawclothing.com.br",
    ).split("?")[0];
  } else {
    permaLink = page?.product.url!;
  }

  try {
    reviews = (await reviewsLoader({
      productId: page!.product!.isVariantOf
        ? page!.product!.isVariantOf?.productGroupID
        : page!.product!.productID,
    })) as ResponseReviews;
  } catch (e) {
    console.log({ e });
  }

  try {
    if (!localStorage.getItem("SIZEBAY_SESSION_ID_V4")) {
      SID = await fetch(
        `https://vfr-v3-production.sizebay.technology/api/me/session-id`,
      ).then((r) => r.json()) as string;

      localStorage.setItem("SIZEBAY_SESSION_ID_V4", SID);
    } else {
      SID = localStorage.getItem("SIZEBAY_SESSION_ID_V4")!;
    }

    console.log({
      localStorage: SID,
    });

    const sizebayProductURL =
      `https://vfr-v3-production.sizebay.technology/plugin/my-product-id?sid=${SID}&permalink=${permaLink}`;

    const sizebayProduct = await fetch(
      sizebayProductURL,
    ).then((r) => r.json());

    console.log({ sizebayProduct });

    if (sizebayProduct && typeof sizebayProduct !== "string") {
      showButtons = sizebayProduct.accessory ? "accessory" : "noAccessory";

      const response = await fetch(
        `https://vfr-v3-production.sizebay.technology/api/me/analysis/${sizebayProduct.id}?sid=${SID}&tenant=664`,
      ).then((r) => r.json());

      if (response.recommendedSize) {
        recommendedSize = response.recommendedSize;
      }

      console.log({ recommendedSize });
    }

    buttonsUrl = (mode: string) =>
      `https://vfr-v3-production.sizebay.technology/V4/?mode=${mode}&id=${sizebayProduct.id}&sid=${SID}&tenantId=664&watchOpeningEvents=true&lang=pt`;
  } catch (e) {
    console.log({ e });
  }

  return { page, variant, reviews, showButtons, buttonsUrl, recommendedSize };
}

export async function sizeBaySIDLoader(
  { page, variant }: Props,
  _req: Request,
) {
  let reviews = {} as ResponseReviews;

  try {
    reviews = (await reviewsLoader({
      productId: page!.product!.isVariantOf
        ? page!.product!.isVariantOf?.productGroupID
        : page!.product!.productID,
    })) as ResponseReviews;
  } catch (e) {
    console.log({ e });
  }

  return { page, variant, reviews };
}

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
          <Button aria-label={"Voltar à página home"}>
            Voltar à página inicial
          </Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo(
  { page, showButtons, buttonsUrl, recommendedSize }: {
    page: ProductDetailsPage;
    showButtons: string | null;
    buttonsUrl: (mode: string) => string;
    recommendedSize: string | null;
  },
) {
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
      {/* Sizebay */}
      <SizebayButtons
        showButtons={showButtons}
        urlChart={buttonsUrl("chart")}
        urlVfr={buttonsUrl("vfr")}
        recommendedSize={recommendedSize}
      />

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
                  aria-label="Adicionar ao carrinho"
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
              <summary
                alt={" Descrição da peça"}
                class="cursor-pointer transform transition  duration-700 hover:font-extrabold uppercase"
              >
                Descrição da peça
              </summary>
              <div
                class="ml-2 py-4 text-base whitespace-pre-line"
                alt={"Descrição"}
              >
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
              <summary
                about={"Troca e devolução"}
                class="cursor-pointer  transform transition duration-700   hover:font-extrabold"
              >
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
  const img = document.getElementsByName("imgzom");
  const box = document.getElementById("box");

  console.log(img);

  box!.addEventListener("mousemove", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    for (let index = 0; index < img.length; index++) {
      img[index]!.style.transformOrigin = `${x}px ${y}px`;
      img[index]!.style.transform = "scale(2)";
    }
  });
  for (let index = 0; index < img.length; index++) {
    box!.addEventListener("mouseleave", () => {
      img[index]!.style.transformOrigin = "center center";
      img[index]!.style.transform = "scale(1)";
    });
  }
}

function Details({
  page,
  variant,
  reviews,
  showButtons,
  buttonsUrl,
  recommendedSize,
}: {
  page: ProductDetailsPage;
  variant: Variant;
  reviews: ResponseReviews;
  showButtons: string | null;
  buttonsUrl: (mode: string) => string;
  recommendedSize: string | null;
}) {
  const {
    breadcrumbList,
    product,
  } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  const { productID, isVariantOf, url } = product;
  const productGroupID = isVariantOf?.productGroupID;

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
            <Slider
              class="carousel gap-2 lg:gap-6 min-w-[40vw] sm:max-w-[40vw]"
              id="box"
            >
              {images.filter((img) => img.alternateName !== "color-thumbnail")
                .map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item  lg:min-w-[40vw]  justify-center"
                  >
                    <div class="flex items-center justify-center m-0 lg:min-h-[930px] overflow-hidden">
                      <div class="absolute flex flex-col top-0 right-[10px]  lg:right-[80px]  justify-center items-end  z-10">
                        <WishlistIcon
                          productGroupID={productGroupID}
                          productID={productID}
                        />
                        <ShareButton
                          productGroupID={productGroupID}
                          productID={productID}
                          url={url!}
                        />
                      </div>

                      <Image
                        class="hidden sm:flex w-[335px] h-[480px] lg:w-[620px] lg:h-[930px] object-cover"
                        // sizes="(max-width: 640px) 100vw, 40vw"
                        style={{ aspectRatio: ASPECT_RATIO }}
                        src={img.url!}
                        alt={img.alternateName}
                        width={620}
                        height={930}
                        // Preload LCP image for better web vitals
                        preload={true}
                        loading={index === 0 ? "eager" : "lazy"}
                        id={"imgzom"}
                        name={"imgzom"}
                      />

                      <Image
                        class="flex sm:hidden  object-cover"
                        // sizes="(max-width: 640px) 100vw, 40vw"
                        style={{ aspectRatio: ASPECT_RATIO }}
                        src={img.url!}
                        alt={img.alternateName}
                        width={335}
                        height={480}
                        // Preload LCP image for better web vitals
                        preload={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
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
                        preload={false}
                        loading={"lazy"}
                      />
                    </Slider.Dot>
                  </li>
                ))}
            </Slider>
          </ul>

          {/* Product Info */}
          <div class="px-4 sm:pr-0 sm:pl-6 lg:col-start-3 lg:col-span-1 lg:row-start-1">
            <ProductInfo
              page={page}
              showButtons={showButtons}
              buttonsUrl={buttonsUrl}
              recommendedSize={recommendedSize}
            />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>

        <ProductReviews
          productID={page.product.isVariantOf
            ? page.product.isVariantOf.productGroupID
            : page.product.productID}
          userHasReviewed={reviews}
        />
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
        dadasdas
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
        <ProductInfo
          page={page}
          showButtons={showButtons}
          buttonsUrl={buttonsUrl}
          recommendedSize={recommendedSize}
        />
      </div>
    </div>
  );
}

function ProductDetails(
  {
    page,
    variant: maybeVar = "auto",
    reviews,
    showButtons,
    buttonsUrl,
    recommendedSize,
  }: SectionProps<
    typeof loader
  >,
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
            reviews={reviews}
            showButtons={showButtons}
            buttonsUrl={buttonsUrl}
            recommendedSize={recommendedSize}
          />
        )
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;
