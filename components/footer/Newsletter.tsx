import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import Icon from "$store/components/ui/Icon.tsx";

import type { JSX } from "preact";


const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);
export type StringNewsletter = {
  Title: string;
  desc?: string;
};

function Newsletter({Title,desc}:StringNewsletter) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex flex-col bg-[#f4f4f4] gap-4  items-center px-[30px] py-[30px] sm:p-10 justify-center sm:max-h-[250px]  sm:max-w-[450px] sm:ml-[auto] sm:mt-[auto]">
      <div class="flex flex-col gap-3">
        <span class="font-bold text-[18px]">
          {Title}
        </span>
        <span class="text-[16px] text-black sm:max-w-[325px]">
          {desc}
        </span>
      </div>
      <form
        class="font-body text-body w-full rounded-none  sm:w-[325px] form-control "
        onSubmit={handleSubmit}
      >
        <div class=" bg-white rounded-none w-full border-b  border-black">
          <input
            name="email"
            class="flex-grow input w-[85%] input-primary h-[40px] focus:outline-none border-none"
            placeholder="e-mail"
          />
          <button class="bg-transparent  border-none w-[15%]  text-center px-5 pt-4 " disabled={loading}>
          <Icon
                            class="text-black"
                            width={20}
                            height={20}
                            id=">"
                            strokeWidth={1}
                          />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
