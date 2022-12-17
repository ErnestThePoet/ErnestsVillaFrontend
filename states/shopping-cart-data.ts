import { makeAutoObservable } from "mobx";
import Decimal from "decimal.js";
import type { SingleItemPurchaseWish } from "../modules/types";

class ShoppingCartData {
    constructor() {
        makeAutoObservable(this, {
            doesItemExist: false
        });
    }

    isDrawerOpen: boolean = false;

    setIsDrawerOpen(value: boolean) {
        this.isDrawerOpen = value;
    }

    cartItems: SingleItemPurchaseWish[] = [];

    setCartItems(value: SingleItemPurchaseWish[]) {
        this.cartItems = value;
    }

    clear() {
        this.cartItems = [];
    }

    addCartItem(item: SingleItemPurchaseWish) {
        this.cartItems.push(item);
    }

    changeCount(index: number, count: number) {
        this.cartItems[index] = { ...this.cartItems[index], count };
    }

    changeId(index: number, id: number) {
        this.cartItems[index] = { ...this.cartItems[index], id };
    }

    deleteItem(index: number) {
        this.cartItems.splice(index, 1);
    }

    doesItemExist(itemId: number) {
        return this.cartItems.some(x => x.item.itemId === itemId);
    }
}

export default new ShoppingCartData();
