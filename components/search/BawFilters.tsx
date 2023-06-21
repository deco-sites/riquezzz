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

function BawFilter(filter: FilterToggle) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <li class="flex flex-col gap-4 w-[260px]">
      <div class="flex justify-between relative cursor-pointer items-center pt-2 pr-5" onClick={() => toggle()}>
        <span class="flex font-semibold text-xl">{filter.label}</span>
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
    <ul class="flex flex-col gap-2 p-4">
      {filters
        .filter(isToggle)
        .map((filter) => <BawFilter {...filter} />)}
    </ul>
  );
}

export default BawFilters;
