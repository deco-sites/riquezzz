import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";
import Modal from "$store/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import Loading from "$store/components/ui/Loading.tsx";

export interface Props {
  showButtons: string | null;
  urlChart: string;
  urlVfr: string;
}

function SizebayButtons(
  { showButtons, urlChart, urlVfr }: Props,
) {
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
        <div>
          <button onClick={toggleDisplayChart}>Sizechart</button>
          {showButtons === "noAccessory" && (
            <button onClick={toggleDisplayVfr}>Provador</button>
          )}
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
              <iframe
                src={urlChart}
                id="auth-iframe"
                class={`w-[100vw] text-center`}
                frameBorder="0"
                height={700}
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
              >
              </iframe>
            </Suspense>
          </Modal>
        </div>
      )}
      {displayVfrIframe && (
        <div>
          <span>Teste</span>
          <iframe
            src={urlVfr}
            id="auth-iframe"
            class={`w-[100vw] text-center`}
            frameBorder="0"
            height={700}
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
          >
          </iframe>
        </div>
      )}
    </div>
  );
}

export default SizebayButtons;
