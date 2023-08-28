import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

export interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  return (
    <Button
      data-deco="add-to-cart "
      aria-label={'Adicionar à sacola'}
      {...props}
      class="w-[280px] text-white uppercase bg-[#00a95b] border-none rounded-none"
    >
      Adicionar à Sacola
    </Button>
  );
}

export default AddToCartButton;
