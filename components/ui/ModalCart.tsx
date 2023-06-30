import Button from "$store/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

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

const ModalCart = ({
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
  const WIDTH = "50%";

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
      class={`bg-transparent only:max-w-full w-full max-h-full h-full backdrop-opacity-50 ${
        dialogStyles[mode]
      } ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      // @ts-expect-error - This is a bug in types.
      onClose={onClose}
    >
      <section
        class={`w-full flex   m-0  bg ${sectionStyles[mode]}`}
      >
        <section
          class={`w-[330px] flex m-0 mr-2 shadow-lg bg ${sectionStyles[mode]}`}
        >
          <div
            class={`w-[330px]  bg-base-100  shadow-lg flex flex-col   ${
              containerStyles[mode]
            }`}
          >
            <header class="flex  py-2 justify-between items-center text-white bg-black text-xs">
              <div class="w-full flex flex-col justify-between items-center">
                <div class="flex flex-row w-full items-center content-start">
                  <Button class="btn btn-ghost" onClick={onClose}>
                    <Icon id="XMark" width={20} height={20} strokeWidth={2} />
                  </Button>{" "}
                  <span class="w-full text-center mr-10">
                    Faltam R$ 299,90 para ao frete grátis
                  </span>
                </div>

                <div class="flex flex-row w-full items-center px-4">
                  <span class="w-[85px] text-xs">
                    R$ 0,00
                  </span>
                  <div class="w-full h-[10px] rounded bg-white mx-2">
                    <div class={`w-[${WIDTH}] h-[10px] rounded bg-green-600`}>
                    </div>
                  </div>
                  <span class="w-[85px] text-xs">
                    R$ 299, 90
                  </span>
                </div>
              </div>
            </header>
            <div class="overflow-y-auto flex flex-col">
              {loading === "lazy" ? lazy.value && children : children}
            </div>
          </div>
        </section>
        <div
          class={`hidden sm:flex w-[30px] h-[30px] mt-4  z-10 absolute bg-black rotate-45 shadow-lg `}
        >
        </div>
      </section>
    </dialog>
  );
};

export default ModalCart;
