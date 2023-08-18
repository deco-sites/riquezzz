import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import type { Context } from "deco-sites/std/packs/vtex/accounts/vtex.ts";
import { parseCookie } from "deco-sites/std/packs/vtex/utils/vtexId.ts";

export interface PropsCreate {
  productId: string;
  rating: number;
  title: string;
  text: string;
  reviewerName: string;
}

export interface CreateResponse {
  id: string;
  productId: string;
  rating: number;
  title: string;
  text: string;
  reviewerName: string;
  shopperId: string;
  reviewDateTime: string;
  searchDate: string;
  verifiedPurchaser: boolean;
  sku: string | null;
  approved: boolean;
  location: string | null;
  locale: string | null;
  pastReviews: string | null;
}

const url = "https://bawclothing.myvtex.com/reviews-and-ratings/api";

//mocking values to study how to get them better
const appkey = "vtexappkey-bawclothing-WYAOPB";
const apptoken =
  "VUZGDTEYYUAQUJMAFABWQWTAURVGEZQIPRGQOFHFOXTGAXCRVYIFPJDXWHCZYZMOYWOQEZVVXKTFZMOXGODJPFGHZIYRLUFYYNDERYORQDHUTBZHBARDYWKSWLTZFTWC";

export const create = async (
  props: PropsCreate,
  req: Request,
  ctx: Context,
): Promise<CreateResponse | null> => {
  const { productId, rating, title, text, reviewerName } = props;
  // const url = new URL(req.url);
  // const page = Number(url.searchParams.get("page")) || 0;
  const { configVTEX: config } = ctx;
  const { cookie, payload } = parseCookie(req.headers, config!.account);
  const user = payload?.sub;

  console.log({ user });

  if (!user) {
    return null;
  }

  try {
    const response = await fetchAPI<CreateResponse>(
      url + "/review",
      {
        method: "POST",
        body: JSON.stringify({
          rating,
          title,
          text,
          reviewerName,
          productId,
          variables: {
            shopperId: user,
          },
        }),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          "X-VTEX-API-AppKey": appkey,
          "X-VTEX-API-AppToken": apptoken,
          cookie,
        },
      },
    );
    console.log({ response });

    return response;
  } catch (e) {
    console.log({ e });
    return (e);
  }
};

export default create;
