import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product, product: { url } }: Props) {
  const possibilities = useVariantPossibilities(product);

  const nv = Object.entries(Object.values(possibilities)[0] ?? {});
  const pppp = nv.find((sku) => sku[0] === "4P");
  const ppp = nv.find((sku) => sku[0] === "3P");
  const pp = nv.find((sku) => sku[0] === "PP");
  const p = nv.find((sku) => sku[0] === "P");
  const m = nv.find((sku) => sku[0] === "M");
  const g = nv.find((sku) => sku[0] === "G");
  const gg = nv.find((sku) => sku[0] === "GG");
  const ggg = nv.find((sku) => sku[0] === "3G");
  const gggg = nv.find((sku) => sku[0] === "4G");

  let newVariants = [pppp, ppp, pp, p, m, g, gg, ggg, gggg];
  newVariants = newVariants.filter((item) => item !== undefined);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm">{name}</span>
          <ul class="flex flex-row gap-3 justify-start max-h-[20px]">
            {newVariants.length > 0
              ? (newVariants.map((item) => (
                <li class="card-body card-actions m-0 max-w-[20px] max-h-[20px] p-[1rem]">
                  <a href={item?.[1][0]}>
                    <Avatar
                      variant={item?.[1] === url ? "active" : "default"}
                      content={item?.[0]!}
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
