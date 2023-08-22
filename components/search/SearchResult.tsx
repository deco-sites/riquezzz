import BawFilters from "$store/components/search/BawFilters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery from "$store/islands/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
}

function NotFound() {
  return (
    <div class="w-full flex flex-col justify-center items-center">
      <div class="w-full flex flex-col sm:flex-row justify-center items-center h-full pb-[30px] sm:pb-[60px] ">
        <div class="flex flex-col justify-center text-center w-full sm:w-[600px] ">
          <span class="text-[8rem] sm:text-[10.5rem] text-[#ccc] font-extrabold ">
            Oops!
          </span>
          <span class="sm:mt-[-60px] text-[20px] sm:text-[30px] text-black font-extrabold">
            Nenhum produto foi encontrado
          </span>
        </div>
        <div class="flex flex-col justify-center min-h-[230px] w-[90vw] sm:w-[600px] pl-[15px] sm:pl-[50px] mt-10 border-l-2 rounded-sm border-black bg-white shadow ">
          <h1 class="text-[25px] sm:text-[30px] font-bold text-black">
            O que eu faço?
          </h1>
          <ul class="gap-3 sm:gap-8  text-black ">
            <li class="flex flex-row justify-start items-center text-sm sm:text-xl font-medium  text-[#868686]">
              <div class="bg-[#eee] flex justify-center rounded-full mr-1 sm:mr-4 p-[3px]">
                <Icon
                  class="text-black "
                  width={12}
                  height={12}
                  id=">"
                  strokeWidth={3}
                />
              </div>
              Verifique os termos digitados.
            </li>
            <li class="flex flex-row justify-start items-center text-sm sm:text-xl  font-medium  text-[#868686]">
              <div class="bg-[#eee] flex justify-center rounded-full mr-1 sm:mr-4 p-[3px] ">
                <Icon
                  class="text-black "
                  width={12}
                  height={12}
                  id=">"
                  strokeWidth={3}
                />
              </div>Tente utilizar uma única palavra.
            </li>
            <li class="flex flex-row justify-start items-center text-sm  sm:text-xl font-medium  text-[#868686]">
              <div class="bg-[#eee] flex justify-center rounded-full mr-1 sm:mr-4 p-[3px] ">
                <Icon
                  class="text-black "
                  width={12}
                  height={12}
                  id=">"
                  strokeWidth={3}
                />
              </div>Utilize termos genéricos na busca.
            </li>
            <li class="flex flex-row justify-start items-center text-sm sm:text-xl  font-medium  text-[#868686]">
              <div class="bg-[#eee] flex justify-center rounded-full mr-1 sm:mr-4 p-[3px]">
                <Icon
                  class="text-black "
                  width={12}
                  height={12}
                  id=">"
                  strokeWidth={3}
                />
              </div>Procure utilizar sinônimos ao termo desejado.
            </li>
          </ul>
        </div>
      </div>
      <span
        class={"hidden w-full  justify-center items-center text-center sm:flex text-[3rem]  text-[#ccc] font-extrabold"}
      >
        Eita, alguma coisa se perdeu por aqui.. talvez esses produtos te ajudem?
      </span>
    </div>
  );
}

function Result(
  { page, variant }: Omit<Props, "page"> & { page: ProductListingPage },
) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  return (
    <>
      <div class="px-4 sm:py-10 sm:pr-14 w-full">
        <div class="flex flex-row">
          {variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px] mt-5">
              <BawFilters filters={filters} />
            </aside>
          )}

          {filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <BawFilters filters={filters} />
            </aside>
          )}
          <div class="flex-grow sm:pt-10 w-full">
            <div class="flex flex-row w-full sm:justify-between pb-10">
              <div class="flex flex-row w-full justify-between items-center sm:mr-10 sm:gap-5">
                <span class="sm:pl-5 min-w-[80px] font-bold text-base flex flex-row">
                  {pageInfo.records} produtos
                </span>
              </div>

              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                breadcrumb={breadcrumb}
                displayFilter={variant === "drawer"}
              />
            </div>
            <ProductGallery products={products} />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="btn-group">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost">
              Página {pageInfo.currentPage}
            </span>
            {pageInfo.nextPage && (
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost"
              >
                <Icon
                  id="ChevronRight"
                  width={20}
                  height={20}
                  strokeWidth={2}
                />
              </a>
            )}
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  { page, ...props }: Props,
) {
  if (!page) {
    return <NotFound />;
  }
  return <Result {...props} page={page!} />;
}

export default SearchResult;
