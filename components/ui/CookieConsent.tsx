import Button from "$store/components/ui/Button.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

const script = (id: string) => `
const callback = () => {
  const KEY = 'store-cookie-consent';
  const ACCEPTED = 'accepted';
  const HIDDEN = "translate-y-[200%]";
  
  const consent = localStorage.getItem(KEY);
  const elem = document.getElementById("${id}");
  
  if (consent !== ACCEPTED) {
    elem.querySelector('[data-button-cc-accept]').addEventListener('click', function () {
      localStorage.setItem(KEY, ACCEPTED);
      elem.classList.add(HIDDEN);
    });
    elem.querySelector('[data-button-cc-close]').addEventListener('click', function () {
      elem.classList.add(HIDDEN);
    });
    elem.classList.remove(HIDDEN);
  }
};

window.addEventListener('scroll', callback, { once: true });
`;

export interface Props {
  image?: LiveImage | undefined;
}
function CookieConsent({ image }: Props) {
  const id = `cookie-consent-${useId()}`;

  return (
    <>
      <div
        id={id}
        class="transform-gpu px-5  transition fixed top-0 w-screen z-50"
      >
        <div class="container max-w-[500px]  flex-row px-6 py-6 rounded-sm border  border-base-200 flex gap-4 items-start  shadow bg-base-100">
          <img
            class="w-[80px]"
            src={"https://dito-browser-notification-images.s3.amazonaws.com/MjAyMC0wMy0yNCAxMTo0OToxNyAtMDMwMEJhdyBDbG90aGluZyBPZmljaWFsODc5/modal/1587406327-logo%2080.jpg"}
            alt="logo"
          />
          <div class="flex w-full flex-col  gap-2  rounded-xl ">
            <span class="flex-grow text-lg font-medium text-black mb-2">
              <div class="flex relative  justify-end">
                <Button
                  data-button-cc-close
                  class="btn-outline mt-[-20px] hover:text-black text-black bg-transparent hover:bg-transparent absolute border-none max-h-[20px] w-[20px] p-0 m-0 rounded"
                >
                  X
                </Button>
              </div>
              Quer receber notificações das nossas campanhas, lançamentos e
              promoções antes de todo mundo?
            </span>
            <div class="flex w-full justify-end">
              <Button
                class=" bg-[#444] rounded-sm text-white  h-[40px] py-0  px-5 w-[120px] border-none transition duration-75 hover:bg-[#7a7a7a]"
                data-button-cc-accept
              >
                SIM!
              </Button>
            </div>
          </div>
        </div>
      </div>
      <script type="module" dangerouslySetInnerHTML={{ __html: script(id) }} />
    </>
  );
}

export default CookieConsent;
