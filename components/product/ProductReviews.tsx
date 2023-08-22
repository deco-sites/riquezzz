import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import Button from "deco-sites/riquezzz/components/ui/Button.tsx";
import { useState } from "preact/hooks";
import { Runtime } from "../../runtime.ts";
import { useCallback } from "preact/hooks";
import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";
import { ResponseReviews } from "$store/loaders/reviewsandratings.ts";

const NewRatingForm = (
  { productId }: {
    productId: string;
  },
) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [reviewerName, setReviewerName] = useState<string | undefined>(
    undefined,
  );
  const [text, setText] = useState<string | undefined>(undefined);
  const [rating, setRating] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createReview = useCallback(async (body: {
    productId: string;
    rating: number;
    title: string;
    text: string;
    reviewerName: string;
  }) => {
    setIsLoading(true);
    const data = await Runtime.invoke({
      key: "deco-sites/riquezzz/actions/createReview.ts",
      props: body,
    });
    setIsLoading(false);
    console.log({ data });
  }, []);

  return (
    <form
      className="form-control w-full  mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        createReview({
          text: text!,
          title: title!,
          rating,
          reviewerName: reviewerName!,
          productId,
        });
      }}
    >
      <h2 class="font-bold text-2xl">Adicionar avaliação</h2>
      <label className="label mt-4">
        <span className="text-xl font-normal">
          Título
        </span>
      </label>
      <input
        type="text"
        value={title}
        className="input input-bordered w-full font-normal text-lg border-[#808080] border-[#808080]"
        onClick={() => {
          if (!title) setTitle("");
        }}
        onChange={(e) => e.target && setTitle(e.currentTarget.value)}
        required
      />
      {title?.length == 0 && (
        <p class="text-red-500 text-sm">
          Escreva um título para a sua avaliação
        </p>
      )}
      <div class="mt-4">
        <label className="label mt-4">
          <span className="text-xl font-normal pb-0">
            Avalie o produto de 1 a 5 estrelas
          </span>
        </label>
        <div className="rating mt-2">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(1)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(2)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(3)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(4)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(5)}
          />
        </div>

        <label className="label mt-4">
          <span className="text-xl font-normal">Seu nome</span>
        </label>
        <input
          type="text"
          value={reviewerName}
          className="input input-bordered w-full font-normal text-lg border-[#808080]"
          onClick={() => {
            if (!reviewerName) setReviewerName("");
          }}
          onChange={(e) => e.target && setReviewerName(e.currentTarget.value)}
          required
        />
        {reviewerName?.length == 0 && (
          <p class="text-red-500 text-sm">Informe seu nome</p>
        )}
        <label className="label mt-4">
          <span className="text-xl font-normal">Escreva uma avaliação</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full font-normal text-lg border-[#808080] h-36"
          value={text}
          onClick={() => {
            if (!text) setText("");
          }}
          onChange={(e) => e.target && setText(e.currentTarget.value)}
          required
        >
        </textarea>
        {text?.length == 0 && (
          <p class="text-red-500 text-sm">
            Escreva um comentário para a sua avaliação
          </p>
        )}
      </div>
      <div class="text-left">
        <Button
          class="bg-black rounded-none text-white shadow-none font-semibold text-base px-11 w-fit mt-6"
          type={"submit"}
        >
          {isLoading ? "carregando..." : "Enviar avaliação"}
        </Button>
      </div>
    </form>
  );
};

function ProductReviews(
  { productID, userHasReviewed }: {
    productID: string;
    userHasReviewed: ResponseReviews;
  },
) {
  const { user } = useUser();
  const isUserLoggedIn = Boolean(user.value?.email);

  console.log({userHasReviewed})

  return (
    <section class="w-full px-auto flex justify-center mb-5">
      <div class="border border-black w-full mt-12 p-8">
        <div>
          <h2 class="uppercase font-bold text-3xl">
            Avaliações do Produto {productID}
          </h2>
          <div className="rating mt-2">
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star cursor-default"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star cursor-default"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star cursor-default"
              checked
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star cursor-default"
              disabled
            />
            <input
              type="radio"
              name="rating-0"
              className="mask mask-star cursor-default"
              disabled
            />
          </div>
          <div>
            <span>Classificação Média: 0 (0 avaliações)</span>
          </div>
        </div>
        <div class="text-right">
          <select className="select select-bordered rounded-none font-light border-black w-[139px] mr-2 text-base text-black">
            <option selected>Mais recentes</option>
            <option>Mais antigas</option>
            <option>Classificação mais alta</option>
            <option>Classificação mais baixa</option>
          </select>
          <select className="select select-bordered rounded-none font-light border-black w-[100px] mr-2 text-base text-black">
            <option selected>Todos</option>
            <option>1 estrela</option>
            <option>2 estrelas</option>
            <option>3 estrelas</option>
            <option>4 estrelas</option>
            <option>5 estrelas</option>
          </select>
        </div>
        <div class="text-center">
          <h2 class="text-2xl font-bold">Nenhuma Avaliação</h2>
          <span>Seja o primeiro a avaliar este produto</span>
        </div>
        {isUserLoggedIn
          ? (
            <div class="text-left mt-4">
              <div
                tabIndex={0}
                className="collapse collapse-arrow bg-white rounded-none shadow-none font-semibold text-base p-0 text-black"
              >
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-xl font-medium w-80 bg-black text-white peer-checked:bg-white peer-checked:text-black peer-checked:border peer-checked:border-black">
                  Escreva uma avaliação
                </div>
                <div className="collapse-content transition   duration-[800ms]">
                  {userHasReviewed.userHasReviewed
                    ? (
                      <div>
                        <span>
                          Você já enviou uma avaliação para este produto
                        </span>
                      </div>
                    )
                    : <NewRatingForm productId={productID} />}
                </div>
              </div>
            </div>
          )
          : (
            <a href="/login">
              <div class="text-center mt-4">
                <Button class="bg-black rounded-none text-white shadow-none font-semibold text-base px-11">
                  Faça login para escrever uma avaliação
                </Button>
              </div>
            </a>
          )}
      </div>
    </section>
  );
}

export default ProductReviews;
