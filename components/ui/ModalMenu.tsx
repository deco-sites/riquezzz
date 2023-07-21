import Button from "$store/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { navbarHeight } from "../header/constants.ts";
import Buttons from "$store/islands/HeaderButton.tsx";
import Searchbar from "../search/Searchbar.tsx";
import Icon from "./Icon.tsx";
import type { Props as SearchbarProps } from "$store/components/search/HeaderSearchbar.tsx";

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
};

const dialogStyles = {
  "sidebar-right": "animate-slide-left",
  "sidebar-left": "animate-slide-right",
  center: "animate-fade-in",
};

const sectionStyles = {
  "sidebar-right": "justify-end",
  "sidebar-left": "justify-start",
  center: "justify-center items-center",
};

const containerStyles = {
  "sidebar-right": "h-full w-full sm:max-w-lg",
  "sidebar-left": "h-full w-full sm:max-w-lg",
  center: "",
};

const ModalMenu = ({
  open,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open === false) {
      document.getElementsByTagName("body").item(0)?.classList.remove(
        "no-scroll",
      );
      ref.current?.open === true && ref.current.close();
    } else if (open === true) {
      document.getElementsByTagName("body").item(0)?.classList.add(
        "no-scroll",
      );
      ref.current?.open === false && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  return (
    <dialog
      {...props}
      ref={ref}
      class={`bg-transparent p-4 m-0 max-w-full w-full max-h-full h-full backdrop-opacity-50 ${
        dialogStyles[mode]
      } ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      onClose={onClose}
    >
      <section
        class={`w-full h-full flex bg-transparent ${sectionStyles[mode]}`}
      >
        <div
          class={`bg-base-100 flex flex-col  ${containerStyles[mode]}`}
        >
          <header class="flex px-4 py-6 justify-between items-center bg-[#f4f4f4] ">
            <Button class="bg-transparent hover:bg-transparent  border-none p-0 m-0 w-[30px] text-black" onClick={onClose}>
              <Icon id="XMark" width={32} height={32} strokeWidth={2} />
            </Button>

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
          </header>

          <div class="bg-[#f4f4f4] flex flex-row w-full justify-between items-center px-4 pb-3  gap-4">
            <div class="flex flex-row justify-center items-center transform transition   duration-100 hover:scale-110">
              <a
                class="bg-transparent hover:bg-transparent  border-none p-0 m-0 w-[30px]"
                href="/login"
                aria-label="Log in"
              >
                <Icon id="User" width={32} height={32} strokeWidth={1} />
              </a>
              <span class="text-[12px] ">MINHA CONTA</span>
            </div>
            <div class="flex flex-row justify-center items-center transform transition   duration-100 hover:scale-110">
              <a
                class="bg-transparent hover:bg-transparent  border-none p-0 m-0 w-[30px]"
                href="/orders"
                aria-label="Orders"
              >
                <img
                  src="https://bawclothing.vtexassets.com/assets/vtex/assets-builder/bawclothing.theme/4.5.13/icons/iconMyOrders___43cd4a2fbf8e478ca5a5fc5f999af1d4.svg"
                  width="50"
                  class="shrink-0 w-[32px] h-[32px]"
                />
              </a>
              <span class="text-[12px] ">MEUS PEDIDOS</span>
            </div>
            <div class="flex flex-row justify-center items-center transform transition   duration-100 hover:scale-110">
              <a
                class="bg-transparent hover:bg-transparent  border-none p-0 m-0 w-[30px]"
                href="/wishlist"
                aria-label="Wishlist"
              >
                <Icon
                  id="Heart"
                  width={32}
                  height={32}
                  strokeWidth={1}
                  fill="none"
                />
              </a>
              <span class="text-[12px] ">MEUS LIKES</span>
            </div>
          </div>
          <div class="w-full bg-[#f4f4f4]">
            <Searchbar />
          </div>
          <div class="overflow-y-auto flex-grow flex flex-col  text-[26px] border-none">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default ModalMenu;
