import { fetchAPI } from "deco-sites/std/utils/fetch.ts";

export interface Props {
  /**
   * @productId Items per page
   * @description Number of products per page to display
   */
  productId: number;
  appkey: string;
  apptoken: string;
}

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

const url = "https://bawclothing.myvtex.com/reviews-and-ratings/api/reviews";

const loader = async (
  props: Props,
): Promise<ResponseReviews | null> => {
  const productId = props.productId;

  try {
    const response = await fetchAPI<ResponseReviews>(
      url + "?product_id=" + productId,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          "X-VTEX-API-AppKey": props.appkey,
          "X-VTEX-API-AppToken": props.apptoken,
        },
      },
    );

    return response;
  } catch {
    return null;
  }
};

export default loader;
