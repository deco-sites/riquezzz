import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface INavItem {
  label: string;
  href: string;
  colorRed: boolean;
  children?: INavItem[];
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, colorRed } = item;

  return (
    <li class=" relative   group font-bold flex items-center border-b-2 border-transparent  b pt-[10px] pb-[10px] box-border h-[70px] ease-out duration-300">
      <a href={href} class="px-4 py-3">
        <span class={colorRed ? "text-red-500" : ""}>
          {label}
          {children && children.length > 0 && (
            <Icon
              id="ChevronDown"
              strokeWidth={2}
              height="15px"
              width="15px"
              class="inline mx-2"
            />
          )}
        </span>
      </a>
      {children && children.length > 0 &&
        (
          <div
            class="bg-gray-200 fixed hidden hover:flex group-hover:flex bg-base-100 z-50
              items-center justify-center gap-2 border-b-2 border-base-200 px-[30px] py-[20px] max-w-[390px] "
            style={{ top: "0px", marginTop: "70px" }}
          >
            {/* items-start justify-center */}
            <ul class="flex flex-row items-center justify-start font-normal gap-2 flex-wrap ">
              {children.map((node) => (
                <li class="p-6">
                  <a
                    class="hover:underline uppercase text-center text-[16px] max-w-[140px]"
                    href={node.href}
                  >
                    <span>{node.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      <div
        class="absolute flex justify-center w-full"
        style={{ bottom: "0px" }}
      >
        <div
          class="w-0 group-hover:w-full h-[2px] m-[auto] transition-all duration-500 ease-in-out bg-black "
          style={{ bottom: "0px" }}
        >
        </div>
      </div>
    </li>
  );
}

export default NavItem;
