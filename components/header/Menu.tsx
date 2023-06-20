import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <div class="collapse  ">
      <input type="checkbox"/>
      <div class="collapse-title uppercase">{item.label}</div>
      <div class="collapse-content">
        <ul class="text-[20px] border-none">
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 mt-10">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
  );
}

export default Menu;
