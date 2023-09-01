import { useState } from "preact/hooks";
import Modal from "$store/components/ui/Modal.tsx";
import { Suspense } from "preact/compat";
import Loading from "$store/components/ui/Loading.tsx";
import SizebayIframe from "deco-sites/riquezzz/components/ui/SizebayIframe.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  showButtons: string | null;
  urlChart: string;
  urlVfr: string;
  productUrl: string | undefined;
}

function SizebayButtons(
  { showButtons, urlChart, urlVfr, productUrl }: Props,
) {
  console.log({ showButtons, urlChart, urlVfr, productUrl });
  const [displayChartIframe, setDisplayChartIframe] = useState(false);
  const [displayVfrIframe, setDisplayVfrIframe] = useState(false);

  const toggleDisplayChart = () => {
    setDisplayChartIframe(!displayChartIframe);
  };

  const toggleDisplayVfr = () => {
    setDisplayVfrIframe(!displayVfrIframe);
  };

  return (
    <div id="sizebay-container">
      {showButtons !== null && (
        <div class="flex justify-start gap-4">
          {showButtons === "noAccessory" && (
            <button class="flex py-4" onClick={toggleDisplayVfr}>
              <Icon class="mr-1" id="Hanger" height={20} width={25} />DESCUBRA
              SEU TAMANHO
            </button>
          )}
          <button class="flex py-4" onClick={toggleDisplayChart}>
            <Icon class="mr-1" id="Ruler" height={20} width={25} />GUIA DE
            MEDIDAS
          </button>
        </div>
      )}
      {displayChartIframe && (
        <div>
          <Modal
            loading="lazy"
            open={displayChartIframe}
            onClose={() => {
              setDisplayChartIframe(false);
            }}
          >
            <Suspense fallback={<Loading />}>
              <SizebayIframe url={urlChart} />
            </Suspense>
          </Modal>
        </div>
      )}
      {displayVfrIframe && (
        <div>
          <Modal
            loading="lazy"
            open={displayVfrIframe}
            class={`max-w-[1000px] bg-transparent shadow-none`}
            onClose={() => {
              setDisplayVfrIframe(false);
            }}
          >
            <Suspense fallback={<Loading />}>
              <SizebayIframe url={urlVfr} />
            </Suspense>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default SizebayButtons;
