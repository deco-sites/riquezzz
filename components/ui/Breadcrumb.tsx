import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="container text-caption breadcrumbs text-sm lg:text-base  ">
      <ul
        class={` max-w-[350px] flex flex-row flex-wrap`}
      >
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li>
              <a href={item}>
                {name === "Home"
                  ? <Icon size={20} id="home" strokeWidth={2} />
                  : (name)}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
