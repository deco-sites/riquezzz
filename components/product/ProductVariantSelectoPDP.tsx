import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector(
  { product, product: { url, isVariantOf, productID } }: Props,
) {
  const possibilities = useVariantPossibilities(product);

  const allProperties = (isVariantOf?.hasVariant ?? [])
    .flatMap(({ offers = {}, url, productID }) =>
      offers.offers?.map((property) => ({ property, url, productID }))
    ).map((p) => ({
      lvl: p?.property.inventoryLevel.value,
      url: p?.url,
      productID: p?.productID,
    }));

  const variants = Object.entries(Object.values(possibilities)[0] ?? {}).map(
    (v) => {
      const [value, [link]] = v;
      const lvl = allProperties.find((p) => p.url === link)?.lvl;
      const skuID = allProperties.find((p) => p.url === link)?.productID;
      return { value, link, lvl: lvl as number, productID: skuID };
    },
  );

  const outOfStock = variants.filter((item) => item.lvl > 0).length === 0;
  const pppp = variants.find((sku) => sku.value === "4P");
  const ppp = variants.find((sku) => sku.value === "3P");
  const pp = variants.find((sku) => sku.value === "PP");
  const p = variants.find((sku) => sku.value === "P");
  const m = variants.find((sku) => sku.value === "M");
  const g = variants.find((sku) => sku.value === "G");
  const gg = variants.find((sku) => sku.value === "GG");
  const ggg = variants.find((sku) => sku.value === "3G");
  const gggg = variants.find((sku) => sku.value === "4G");

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
                <li class="card-body card-actions m-0 max-w-[50px] max-h-[20px] items-center p-[0px]">
                  <a href={item?.link}>
                    <Avatar
                      variant={item?.productID === productID
                        ? "active"
                        : (item?.lvl !== 0 ? "default" : "disabled")}
                      content={item?.value!}
                      textSize="lg"
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
