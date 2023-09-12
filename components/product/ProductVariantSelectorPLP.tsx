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
  const pppp = variants.find((sku) => sku.value === "4P") ||
    variants.find((sku) => sku.value === "04");
  const ppp = variants.find((sku) => sku.value === "3P") ||
    variants.find((sku) => sku.value === "06");
  const pp = variants.find((sku) => sku.value === "PP") ||
    variants.find((sku) => sku.value === "08");
  const p = variants.find((sku) => sku.value === "P") ||
    variants.find((sku) => sku.value === "10");
  const m = variants.find((sku) => sku.value === "M") ||
    variants.find((sku) => sku.value === "12");
  const g = variants.find((sku) => sku.value === "G");
  const gg = variants.find((sku) => sku.value === "GG");
  const ggg = variants.find((sku) => sku.value === "3G");
  const gggg = variants.find((sku) => sku.value === "4G");

  let newVariants = [pppp, ppp, pp, p, m, g, gg, ggg, gggg];
  newVariants = newVariants.filter((item) => item !== undefined);

  return (
    <li class="flex items-center justify-center  w-full ml-[-20px] ">
      {Object.keys(possibilities).map((name) => (
        <ul class="flex flex-row flex-wrap  gap-2  justify-center  p-[0px] ">
          {newVariants.length > 0
            ? (newVariants.map((item) => (
              <li class="card-body card-actions m-0 max-w-[40px]  max-h-[40px] mb-[10px]  items-center p-[0px]">
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
              <li class="card-body card-actions m-0 max-w-[40px]  max-h-[40px] mb-[10px] items-center p-[0px]">
                <a href={link}>
                  <Avatar
                    content={value}
                    variant={link === url ? "active" : "default"}
                    textSize="lg"
                  />
                </a>
              </li>
            )))}
        </ul>
      ))}
    </li>
  );
}

export default VariantSelector;
