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
      <div class="w-[80px] flex flex-col  bg-white pr-8 justify-center items-center ">
        <div class="w-[30px] text-center justify-center flex p-0 m-0 mb-5">
          <Buttons variant="cart" />
        </div>
        <div class="w-full flex text-center justify-center items-start mb-6">
          <a
            class="transform transition   duration-100 hover:scale-125  text-center justify-center items-start"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="BawLogin" width={25} height={25} strokeWidth={0.4} />
          </a>
        </div>
        <div class="w-full flex text-center justify-center items-start mb-6">
          <a
            class=" transform transition  duration-100 hover:scale-125  text-center justify-center  items-start "
            href="/orders"
            aria-label="Orders"
          >
            <Icon id="BawOrders" width={25} height={25} strokeWidth={0.4} />
          </a>
        </div>
        <div class="w-full flex text-center justify-center items-start mb-6">
          <a
            class="transform transition  duration-100 hover:scale-125  text-center justify-center  items-start"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon id="BawWishlist" size={25} strokeWidth={2} fill="none" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
