import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";

import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2 mb-2">
      <div
        aria-checked={selected}
        class="checkbox bg-gray-200 rounded-none border-none"
      />
      <span class="text-sm ">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "avatar" ? "flex-row" : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "avatar") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

interface FilterIconInterface {
  [key: string]: string;
}

function FilterIcon({ key }: FilterToggle) {
  const icons = {
    modelo: "https://bawclothing.vtexassets.com/assets/vtex/assets-builder/bawclothing.theme/4.5.13/icons/filter-modelo___1c41ef834aa83dacb579f04e502978ee.svg",
    cor: "https://bawclothing.vtexassets.com/assets/vtex/assets-builder/bawclothing.theme/4.5.13/icons/icon-filter-color___158735669d0fc878cae0e4170bd4dddd.svg",
    tamanho: "https://bawclothing.vtexassets.com/assets/vtex/assets-builder/bawclothing.theme/4.5.13/icons/filter-tamanho___e4e57b5416928185d3a00ccf3d1e965b.svg",
    estilo: "https://bawclothing.vtexassets.com/assets/vtex/assets-builder/bawclothing.theme/4.5.13/icons/filter-estilo___921a36e559279e91c1f84465941a15fb.svg"
  }

  return (
    <span class={ key in icons ? "w-[37px] mr-3" : ""}>
      { key in icons ? <img src={(icons as FilterIconInterface)[key]} /> : '' }
    </span>
  )
}

function BawFilter(filter: FilterToggle) {
  const [isOpen, setIsOpen] = useState(false);
  const { key } = filter;

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <li class="flex flex-col gap-4">
      <div
        class="flex justify-between relative cursor-pointer items-center pt-2 pr-5"
        onClick={() => toggle()}
      >
        <span class="flex font-semibold text-xl justify-center items-center"><FilterIcon {...filter} />{filter.label}</span>
        <Icon
          class="flex items-center"
          size={15}
          id={isOpen ? "ChevronUp" : "ChevronDown"}
          strokeWidth={3}
        />
      </div>
      <div
        class={`grid border-solid border-b border-gray-200 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } transition-[grid-template-rows] duration-600 ease-in-out`}
      >
        <div class={`overflow-hidden`}>
          <FilterValues {...filter} />
        </div>
      </div>
    </li>
  );
}

function BawFilters({ filters }: Props) {
  return (
    <ul class="flex-col gap-2 p-4 flex">
      {filters
        .filter(isToggle)
        .map((filter) => <BawFilter {...filter} />)}
    </ul>
  );
}

export default BawFilters;
