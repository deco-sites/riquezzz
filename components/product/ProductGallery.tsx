import { Product } from "deco-sites/std/commerce/types.ts";
import { useUI } from "../../sdk/useUI.ts";
import ProductCard from "./ProductCard.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
}

function ProductGallery({ products }: Props) {
  const { listingType } = useUI();

  if (listingType.value === "2") {
    return (
      <div class=" grid grid-cols-2 gap-2 sm:gap-8 items-center  lg:grid-cols-2">
        {products?.map((product, index) => (
          <ProductCard product={product} preload={true} />
        ))}
      </div>
    );
  } else if (listingType.value === "4") {
    return (
      <div class=" grid grid-cols-2 gap-2 sm:gap-8 items-center   lg:grid-cols-4">
        {products?.map((product, index) => (
          <ProductCard product={product} preload={true} />
        ))}
      </div>
    );
  } else {
    return (
      <div class=" grid grid-cols-2 gap-2 sm:gap-8 items-center   lg:grid-cols-6">
        {products?.map((product, index) => (
          <ProductCard product={product} preload={true} />
        ))}
      </div>
    );
  }
}

export default ProductGallery;
