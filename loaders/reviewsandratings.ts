import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";

export interface PropsLoad {
  productId: number;
  rating: string;
}

// export interface PropsCreate {
//   productId: string;
//   rating: number;
//   title: string;
//   text: string;
//   reviewerName: string;
// }

export interface ResponseReviews {
  data?: Reviews;
  range: {
    total: number;
    from: number;
    to: number;
  };
}

export interface Reviews {
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
  locale: string | null;
  pastReviews: string | null;
}
[];

// export interface CreateResponse {
//   id: string;
//   productId: string;
//   rating: number;
//   title: string;
//   text: string;
//   reviewerName: string;
//   shopperId: string;
//   reviewDateTime: string;
//   searchDate: string;
//   verifiedPurchaser: boolean;
//   sku: string | null;
//   approved: boolean;
//   location: string | null;
//   locale: string | null;
//   pastReviews: string | null;
// }

const url = "https://bawclothing.myvtex.com/reviews-and-ratings/api";

const productId = "2147351545";

const loader = async (
  // props: PropsLoad,
): Promise<ResponseReviews | null> => {
  // const productId = props.productId;
  const { user } = useUser();
  console.log({ user });

  try {
    const response = await fetchAPI<ResponseReviews>(
      url + "/reviews?product_id=" + productId,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      },
    );

    return response;
  } catch (e) {
    console.log({ e });
    return null;
  }
};

// export const create = async (
//   props: PropsCreate,
// ): Promise<CreateResponse | null> => {
//   const { rating, title, text, reviewerName } = props;

//   console.log("create");

//   try {
//     const response = await fetchAPI<CreateResponse>(
//       url + "/review",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           rating,
//           title,
//           text,
//           reviewerName,
//         }),
//         headers: {
//           "content-type": "application/json",
//           accept: "application/json",
//           "X-VTEX-API-AppKey": appkey,
//           "X-VTEX-API-AppToken": apptoken,
//         },
//       },
//     );

//     return response;
//   } catch (e) {
//     console.log({ e });
//     return null;
//   }
// };

export default loader;
