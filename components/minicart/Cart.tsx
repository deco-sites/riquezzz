import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";
import Icon from "../ui/Icon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const totalizers = cart.value?.totalizers;
  const total2 = totalizers?.find((item) => item.id === "Items")?.value || 0;

  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <>
        <header class="flex  py-2 justify-between items-center text-white bg-black text-xs">
          <div class="w-full flex flex-col justify-between items-center">
            <div class="flex flex-row w-full items-center content-start">
              <Button
                class="btn btn-ghost"
                onClick={() => displayCart.value = !displayCart.value}
              >
                <Icon id="XMark" width={20} height={20} strokeWidth={2} />
              </Button>{" "}
              <div class="px-2 py-4">
                <FreeShippingProgressBar
                  total={total2 / 100}
                  target={1000}
                  locale={locale!}
                  currency={currencyCode!}
                />
              </div>
            </div>
          </div>
        </header>
        <div class="flex flex-col justify-center items-center  h-[200px] gap-6">
          <span class="font-medium text-[14px] uppercase text-[#a2a2a2]">
            {"Seu carrinho está vazio :("}
          </span>
          <span class="font-medium text-[14px] uppercase">
            continue comprando
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <header class="flex  py-2 justify-between items-center text-white bg-black text-xs">
        <div class="w-full flex flex-col justify-between items-center">
          <div class="flex flex-row w-full items-center content-start">
            <div class="px-2 py-4">
              <FreeShippingProgressBar
                total={total2 / 100}
                target={299}
                locale={locale!}
                currency={currencyCode!}
              />
            </div>
          </div>
        </div>
      </header>
      {/* Cart Items */}
      <ul
        role="list"
        class="mt-6 p-2 max-h-[60vh] flex-grow overflow-y-auto flex flex-col gap-6 "
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer>
        {/* Subtotal */}
        <div class="border-t border-base-200 py-4 flex flex-col gap-4">
          {discounts?.value && (
            <div class="flex justify-between items-center px-4">
              <span class="text-sm uppercase">Descontos</span>
              <span class="text-sm">
                {formatPrice(discounts.value / 100, currencyCode!, locale)}
              </span>
            </div>
          )}
          <Coupon />
        </div>
        {/* Total */}
        {total?.value && (
          <div class="pt-4 flex flex-col justify-end items-end gap-2 mx-4">
            <div class="flex justify-between items-center w-full">
              <span class="text-sm uppercase">Total</span>
              <span class="font-medium text-sm uppercase ">
                {formatPrice(total.value / 100, currencyCode!, locale)}
              </span>
            </div>
          </div>
        )}
        <div class="p-4">
          <a class="inline-block w-full" href="/checkout">
            <button
              data-deco="buy-button "
              class="w-full font-bold py-2 uppercase bg-green-500 border-none rounded-none text-white hover:bg-green-700"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total?.value
                      ? (total?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              Finalizar Compra
            </button>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Cart;
