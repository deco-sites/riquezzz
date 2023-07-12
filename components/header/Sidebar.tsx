import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  items: INavItem[];
  searchbar: SearchbarProps;
}

function Sidebar({ interval = 5, items, searchbar }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <div class="w-[70px]  bg-white">
        {
          /* <div class="w-full">
          <Buttons variant="search" />
        </div> */
        }
        <div class="w-full mb-2">
          <Buttons variant="cart" />
        </div>
        <div class="w-full mb-2">
          <a class="btn btn-square btn-ghost" href="/login" aria-label="Log in">
            <Icon id="BawLogin" width={20} height={20} strokeWidth={0.4} />
          </a>
        </div>
        <div class="w-full mb-2">
          <a
            class="btn btn-square btn-ghost"
            href="/orders"
            aria-label="Orders"
          >
            <Icon id="BawOrders" width={20} height={20} strokeWidth={0.4} />
          </a>
        </div>
        <div class="w-full mb-2">
          <a
            class="btn btn-square btn-ghost"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon id="BawWishlist" size={20} strokeWidth={2} fill="none" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
