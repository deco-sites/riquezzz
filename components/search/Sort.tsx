import { useMemo } from "preact/hooks";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  console.log(e.currentTarget.value);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

interface IDictionary<T> {
  [key: string]: T;
}

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  const labels: IDictionary<string> = {
    "price:asc": "Menor preço",
    "price:desc": "Maior preço",
    "name:asc": "De A a Z",
    "name:desc": "De Z a A",
    "release:desc": "Mais recentes",
    "relevance:desc": "Relevância",
    "orders:desc": "Mais Vendidos",
    "discount:desc": "Descontos"
  };

  return (
    <select
      id="sort"
      name="sort"
      onInput={applySort}
      class="w-min h-[36px] px-1 m-2 text-button font-button text-base-content cursor-pointer outline-none border-b border-black"
    >
      {sortOptions.map(({ value, label }) => (
        <option key={value} value={value} selected={value === sort}>
          <span class="text-sm">{labels[label]}</span>
        </option>
      ))}
    </select>
  );
}

export default Sort;
