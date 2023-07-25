import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product, product: { url } }: Props) {
  const possibilities = useVariantPossibilities(product);

  const keys = Object.keys(possibilities["Tamanho"]);
  const nv = keys.map((key) => {
    return { value: key, link: possibilities["Tamanho"][key][0] };
  });

  const sizes = ["4P", "3P", "PP", "P", "M", "G", "GG", "3G", "4G"];
  const newVariants = sizes.map((size) => {
    const sku = nv.find((sku) => sku.value === size);
    return sku;
  });

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm">{name}</span>
          <ul class="flex flex-row gap-3 justify-start max-h-[20px]">
            {newVariants.length > 0
              ? (newVariants.map((variant) => (
                <li class="card-body card-actions m-0 max-w-[20px] max-h-[20px] p-[1rem]">
                  <a href={variant?.link}>
                    <Avatar
                      content={variant?.value as string}
                      variant={variant?.link === url ? "active" : "default"}
                    />
                  </a>
                </li>
              )))
              : (Object.entries(possibilities[name]).map(([value, [link]]) => (
                <li class="card-body card-actions m-0 max-w-[20px] max-h-[20px] p-[1rem]">
                  <a href={link}>
                    <Avatar
                      content={value}
                      variant={link === url ? "active" : "default"}
                    />
                  </a>
                </li>
              )))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
