import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ComponentChildren } from "preact";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type IconItem = { icon: AvailableIcons; href: string };
export type StringItem = {
  label: string;
  href?: string;
};
export type StringNewsletter = {
  Title: string;
  desc?: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-white text-[14px]">
      {isIcon(item)
        ? (
          <div class="border-white border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  Service: string;
  Phone_Number: string;
  Href_Instagram: string;
  Href_Facebook: string;
  Href_Twitter: string;
  sections?: Section[];
  titleNewsletter: string;
  descNewsletter: string;
  imgFooter: LiveImage;
}

function Footer(
  {
    sections = [],
    Service,
    Phone_Number,
    Href_Instagram,
    Href_Facebook,
    Href_Twitter,
    titleNewsletter,
    descNewsletter,
    imgFooter,
  }: Props,
) {
  return (
    <>
      <footer class="sm:bg-[url('https://bawclothing.vtexassets.com/assets/vtex/assets-builder/bawclothing.theme/4.5.13/img/bg-img-footer___f97b5671fcf089ebf7415649360e7e9a.png')] 
      sm:bg-cover sm:bg-no-repeat w-full sm:bg-primary-dark flex flex-col divide-y divide-primary-content sm:pb-[80px] sm:px-8 bg-[#f4f4f4]">
        <div>
          <div class="container w-full flex flex-col divide-y divide-primary-content border-b border-[#9a9a9a79]">
            <FooterContainer>
              {/* Desktop view */}
              <ul class="hidden sm:flex flex-row justify-start gap-52">
                {sections.map((section) => (
                  <li>
                    <div>
                      <span class="text-[14px] text-[#9a9a9a]">
                        {section.label}
                      </span>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 pt-2 flex-wrap`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}

                <li>
                  <div>
                    <span class="text-[14px] text-[#9a9a9a]">
                      Fale Conosco
                    </span>

                    <ul class="flex flex-col gap-2 pt-2 flex-wrap">
                      <li>
                        <SectionItem item={{ label: "SAC " + Phone_Number }} />
                      </li>
                      <li>
                        <SectionItem
                          item={{ label: "Horários de Atendimento" }}
                        />
                      </li>
                      <li>
                        <SectionItem item={{ label: Service }} />
                      </li>
                      <li>
                        <div class="flex flex-row object-center justify-start text-end gap-5">
                          <a
                            href={Href_Facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="F Facebook"
                          >
                            <Icon
                              class="text-white"
                              width={25}
                              height={25}
                              id="F Facebook"
                              strokeWidth={0}
                            />
                          </a>

                          <a
                            href={Href_Twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter Logo"
                          >
                            <Icon
                              class="text-white"
                              width={25}
                              height={25}
                              id="TwitterLogo"
                              strokeWidth={1}
                            />
                          </a>
                          <a
                            href={Href_Instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram logo"
                          >
                            <Icon
                              class="text-white pb-1"
                              width={32}
                              height={32}
                              id="Instagram"
                              strokeWidth={2}
                            />
                          </a>
                        </div>
                     
                      </li>
                    </ul>
                  </div>
                </li>
                      <Newsletter Title={titleNewsletter} desc={descNewsletter} />
              </ul>

              {/* Mobile view */}
              <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
                <Newsletter Title={titleNewsletter} desc={descNewsletter} />
              </ul>
            </FooterContainer>
          </div>
        </div>
      </footer>

      <div class="w-full bg-black">
        <div class="container w-full">
          <FooterContainer class="flex justify-between w-full">
            <span class="flex items-center gap-1 text-primary-content">
              Powered by{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
              >
                <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
              </a>
            </span>

            <ul class="flex items-center justify-center gap-2">
              <li>
                <a
                  href="https://www.instagram.com/deco.cx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Instagram"
                    strokeWidth={1}
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://www.deco.cx/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Discord"
                    strokeWidth={5}
                  />
                </a>
              </li>
            </ul>
          </FooterContainer>
        </div>
      </div>
    </>
  );
}

export default Footer;
