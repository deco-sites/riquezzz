import Searchbar from "$store/components/search/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/HeaderSearchbar.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between px-4 py-6 items-center  w-full"
      >
        <Buttons variant="menu" />
        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <img
            src="https://bawclothing.vtexassets.com/assets/vtex/assets-builder/bawclothing.theme/4.5.11/icons/logo___043f201c675b2c2939f6d4796ccf0144.svg"
            width="50"
            class="shrink-0 w-full h-[27px]"
          />
        </a>

        <div class="flex gap-1">
          {/* <Buttons variant="search" /> */}
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-8">
        <div class="flex-none w-44 shrink-0">
          <a href="/" aria-label="Store logo" class="block px-4 py-3 w-[160px]">
            <img
              src="https://bawclothing.vtexassets.com/assets/vtex/assets-builder/bawclothing.theme/4.5.11/icons/logo___043f201c675b2c2939f6d4796ccf0144.svg"
              width="50"
              class="shrink-0 w-auto h-[27px]"
            />
          </a>
        </div>
        <div class="flex justify-start uppercase mr-[auto] ml-0 shrink-0 gap-4">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="grow flex items-center justify-end max-w-[780px] bg-gray-100">
          <div class="w-full h-[70px]">
            <Searchbar {...searchbar} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
