// import { useState } from "preact/hooks";

export interface Props {
  title?: string;
  url: string;
}

const runOnMount = () => {
  window.onload = (e) => {
    const iFrame = document.getElementById(
      "auth-iframe",
    ) as HTMLIFrameElement;

    if (!iFrame) {
      return console.error("Couldn't find iframe");
    }

    // console.log({
    //   x: iFrame!.contentWindow!.document.body.scrollWidth,
    //   y: iFrame!.contentWindow!.document.body.scrollHeight,
    // });

    iFrame.height = iFrame!.contentWindow!.document.body.scrollHeight
      .toString() + "px";
    // console.log({ iframeHeight: iFrame.height });
    // console.log("Foi");
  };
};

function AuthIframe({
  url = "",
  title = "",
}: Props) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(${runOnMount})();` }}>
      </script>
      <div>
        <header class="flex flex-col justify-center items-center gap-4">
          <span class="text-base-100">{title}</span>
        </header>
        <main class="w-full max-w-[80%] sm:max-w-[50%] text-center">
          <iframe
            src={url}
            id="auth-iframe"
            class={`w-[100vw] text-center`}
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
          >
          </iframe>
        </main>
      </div>
    </>
  );
}

export default AuthIframe;
