export interface Props {
  title?: string;
  url: string;
}

function AuthIframe({
  url = "",
  title = "",
}: Props) {
  return (
    <div>
      <header class="flex flex-col justify-center items-center gap-4">
        <span class="text-base-100">{title}</span>
      </header>
      <main class="w-full max-w-[80%] sm:max-w-[50%] text-center">
        <iframe
          src={`https://riquezzz.deco.site` + url}
          class={`w-[100vw] text-center h-[500px]`}
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
        >
        </iframe>
      </main>
    </div>
  );
}

export default AuthIframe;
