import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-start items-center gap-2 text-white w-full">
        <Button class="btn btn-ghost">
          <Icon id="XMark" width={20} height={20} strokeWidth={2} />
        </Button>{" "}
        {remaining > 0
          ? (
            <span>
              Faltam ${formatPrice(remaining, currency, locale)}{" "}
              para ganhar frete grátis!
            </span>
          )
          : (
            <span class="w-[200px] text-center ">
              Você ganhou frete grátis!
            </span>
          )}
      </div>
      <div class="flex flex-row w-full items-center px-4">
        <span class="w-[85px] text-xs">
          {total &&
            (formatPrice(total, currency!, locale))}
        </span>
        <progress
          class="progress progress-accent w-full mr-1"
          value={percent}
          max={100}
        />
        <span class="w-[85px] text-xs">
          R$ 299, 90
        </span>
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
