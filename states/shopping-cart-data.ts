import { makeAutoObservable } from "mobx";

interface CartItem {
    itemId: number;
    name: string;
    previewImageFileName: string;

    count: number;
}

class ShoppingCartData{
    constructor() {
        makeAutoObservable(this);
    }

    cartItems: CartItem[] = [];

    setCartItems(value: CartItem[]) {
        this.cartItems = value;
    }
}

export default new ShoppingCartData();