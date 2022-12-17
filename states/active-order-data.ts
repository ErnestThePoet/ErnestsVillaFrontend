import { makeAutoObservable } from "mobx";
import { SingleItemPurchaseWish } from "../modules/types";

class ActiveOrderData {
    constructor() {
        makeAutoObservable(this);
    }

    items: SingleItemPurchaseWish[] = [];

    consigneeAddress: string = "";
    consigneeName: string = "";
    consigneePhoneNumber: string = "";

    setItems(items: SingleItemPurchaseWish[]) {
        this.items = items;
    }

    setConsigneeAddress(value: string) {
        this.consigneeAddress = value;
    }

    setConsigneeName(value: string) {
        this.consigneeName = value;
    }

    setConsigneePhoneNumber(value: string) {
        this.consigneePhoneNumber = value;
    }

    clear() {
        this.items = [];
        this.consigneeAddress = "";
        this.consigneeName = "";
        this.consigneePhoneNumber = "";
    }
}

export default new ActiveOrderData();
