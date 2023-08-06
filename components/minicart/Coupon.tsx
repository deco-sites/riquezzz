import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

function Coupon() {
  const { cart, loading, addCouponsToCart } = useCart();
  const ref = useRef<HTMLInputElement>(null);
  const displayInput = useSignal(false);
  const coupon = cart.value?.marketingData?.coupon;

  const toggleInput = () => {
    displayInput.value = !displayInput.value;
  };

  const removeCouponFromCart = (e: MouseEvent) => {
    e.preventDefault();

    const text = "";

    if (typeof text === "string") {
      addCouponsToCart({ text });

      toggleInput();
    }
  };

  const applyCouponToCart = (e: MouseEvent) => {
    e.preventDefault();

    const text = ref.current?.value;

    if (typeof text === "string") {
      addCouponsToCart({ text });
      toggleInput();
    }
  };

  return (
    <div class="flex flex-col justify-between items-center gap-2 px-4 py-2 bg-[#f4f4f4]">
      <span class="text-sm uppercase font-bold text-[#a2a2a2]">
        Cupom de desconto
      </span>
      <form
        class={`flex gap-2  ${
          coupon ? "bg-[#f4f4f4]" : "bg-white"
        } rounded-none w-full border-b  border-black`}
      >
        <input
          style={coupon
            ? { "background-color": "#f4f4f4" }
            : { "background-color": "white" }}
          class="flex-grow input w-[85%] input-primary h-[40px] focus:outline-none border-none"
          name="coupon"
          ref={ref}
          type="text"
          value={coupon ?? ""}
          disabled={coupon !== null}
          placeholder={"Insira o código"}
        />
        {!coupon && (
          <button
            class="bg-transparent  border-none w-[15%]  text-center px-5"
            disabled={loading}
            onClick={applyCouponToCart}
          >
            <Icon
              class="text-black"
              width={20}
              height={20}
              id=">"
              strokeWidth={1}
            />
          </button>
        )}

        {coupon && (
          <button
            class="bg-transparent  border-none w-[15%]  text-center pr-6"
            disabled={loading}
            onClick={removeCouponFromCart}
          >
            <span>remover</span>
          </button>
        )}
      </form>
    </div>
  );
}

export default Coupon;
