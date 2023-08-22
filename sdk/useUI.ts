/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchbar = signal(false);
const listingType = signal("4");

const state = {
  displayCart,
  displayMenu,
  displaySearchbar,
  listingType,
};

export const useUI = () => state;
