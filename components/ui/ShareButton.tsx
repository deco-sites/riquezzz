import { useComputed, useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useWishlist } from "deco-sites/std/packs/vtex/hooks/useWishlist.ts";
import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
}

function ShareButton({
  variant = "icon",
  productGroupID,
  productID,
}: Props) {
  const { user } = useUser();
  const item = { sku: productID, productId: productGroupID };
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const { buttonShare } = useUI();

  return (
    <>
      <Button
        class={variant === "icon"
          ? "btn-circle btn-ghost gap-2"
          : "btn-outline gap-2"}
        loading={false}
        aria-label="Share Button"
        onClick={(e) => {
          buttonShare.value = !buttonShare.value;
        }}
      >
        <Icon
          id="share"
          size={25}
          strokeWidth={1}
        />
      </Button>
      {buttonShare.value === true
        ? (
          <div class={`flex  w-[50px]  z-1 top-0 right-0 `}>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Icon
                id="WhatsApp"
                size={20}
                strokeWidth={1}
              />
            </a>

            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Icon
                id="Facebook"
                size={20}
                strokeWidth={1}
              />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Icon
                id="TwitterLogo"
                size={20}
                strokeWidth={1}
              />
            </a>
          </div>
        )
        : ("")}
    </>
  );
}

export default ShareButton;
