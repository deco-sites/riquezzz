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
    <a href={url} class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox bg-gray-200 rounded-none border-none" />
      <span class="text-sm ">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
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

function BawFilters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 p-4">
      {filters
        .filter(isToggle)
        .map((filter, index) => (
          <BawFilter index={index} filter={filter} />
        ))}
    </ul>
  );
}

function BawFilter({ filter, index }: any) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen)
  }

  return (
    <li class="flex flex-col gap-4 w-[260px]" >
      <div class="relative cursor-pointer  pr-12" onClick={() => toggle()}>
        <span class="font-semibold text-xl">{filter.label}</span>
        <Icon class="absolute right-4 top-auto bottom-1" size={20} id={isOpen ? "ChevronUp" : "ChevronDown"} strokeWidth={3} />
      </div>
      <div class={`grid ${ isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]' } transition-[grid-template-rows] duration-600 ease-in-out`} >
        <div class={`overflow-hidden`}>
          <FilterValues {...filter} />
        </div>
      </div>
      <div class="w-full h-[1px] bg-gray-200"></div>
    </li>
  )
}

export default BawFilters;
