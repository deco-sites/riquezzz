import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  /**
   * @description It will shrink the image to fit the container
   */
  shrink: boolean;
  /**
   * @description It will set the number of columns for the image
   */
  size_cols: number;

  /**
   * @description It will set the number of rows for the image
   */
  size_rows: number;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 5 */
    desktop?: 1 | 2 | 5 | 4 | 6 | 8;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

interface Size {
  [inedx: number]: string;
}

const IMAGE_SIZE: Size = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
};

const ROW_SIZE: Size = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  6: "row-span-6",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function BawBannner({
  title,
  itemsPerLine,
  borderRadius,
  banners = [],
}: Props) {
  return (
    <section class="w-[99vw] px-1 md:pl-2 mx-auto md:pr-[50px]">
      <div
        class={`grid grid-flow-row-dense grid-rows-2 gap-4 md:gap-4 ${
          MOBILE_COLUMNS[itemsPerLine.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine.desktop ?? 4]}`}
      >
        {banners.map((
          { href, srcMobile, srcDesktop, alt, size_cols, size_rows },
          index,
        ) => (
          <div
            class={` ${IMAGE_SIZE[size_cols ?? 2]} ${
              ROW_SIZE[size_rows ?? 1]
            } transform transition duration-500 hover:scale-95 `}
          >
            <Picture
              class={index > 1 ? "hidden md:block text-center" : "w-full"}
            >
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={1920}
                height={1920}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={1920}
                height={1920}
              />
              <img
                class="w-full object-cover"
                //   sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </div>
        ))}
      </div>
    </section>
  );
}
