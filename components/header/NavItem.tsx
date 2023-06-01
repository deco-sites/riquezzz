import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface INavItem {
  label: string;
  href: string;
  colorRed: boolean;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image, colorRed } = item;

  return (
    <li class="group flex items-center border-b-2 border-transparent hover:border-black b pt-[10px] pb-[10px] box-border h-[70px] ease-out duration-300">
      <a href={href} class="px-4 py-3">
        { colorRed && (<span class="text-red-500">
          {label}
          {children && children.length > 0 && (<Icon id="ChevronDown" strokeWidth={1} height="15px" width="15px" class="inline" />)}
        </span>)}
        { !colorRed && (<span>
          {label}
          {children && children.length > 0 && (<Icon id="ChevronDown" strokeWidth={1} height="15px" width="15px" class="inline" />)}
        </span>)}
        
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="bg-gray-200 fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-2 border-t border-b-2 border-base-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: "70px" }}
          >
            {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <span>{node.label}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
