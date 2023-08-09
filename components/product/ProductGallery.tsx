import { Product } from "deco-sites/std/commerce/types.ts";

import ProductCard from "./ProductCard.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
  value: number;
}

function ProductGallery({ products }: Props, value: number) {
  return (
    <div
      class={`grid grid-cols-2 gap-2 sm:gap-8 items-center lg:grid-cols-4 `}
    >
      {products?.map((product, index) => (
        <ProductCard product={product} preload={index === 0} />
      ))}
    </div>
  );
}

export default ProductGallery;
