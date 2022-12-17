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

    getItemTotalPriceYuan(index: number) {
        return new Decimal(this.cartItems[index].item.priceYuan)
            .mul(this.cartItems[index].count)
            .toFixed(2);
    }

    get totalPriceYuan() {
        return this.cartItems
            .reduce(
                (p, _, i) => p.add(this.getItemTotalPriceYuan(i)),
                new Decimal(0)
            )
            .toFixed(2);
    }

    doesItemExist(itemId: number) {
        return this.cartItems.some(x => x.item.itemId === itemId);
    }
}

export default new ShoppingCartData();
