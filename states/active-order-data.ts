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

    purchaseId: number = -1;
    totalPriceYuan: string = "";
    totalPriceCents: number = 0;
    expireTime: Date = new Date();

    setData(
        items: SingleItemPurchaseWish[],
        consigneeAddress: string,
        consigneeName: string,
        consigneePhoneNumber: string,
        purchaseId: number,
        totalPriceYuan: string,
        totalPriceCents: number,
        expireTime: number
    ) {
        this.items = items;
        this.consigneeAddress = consigneeAddress;
        this.consigneeName = consigneeName;
        this.consigneePhoneNumber = consigneePhoneNumber;
        this.purchaseId = purchaseId;
        this.totalPriceYuan = totalPriceYuan;
        this.totalPriceCents = totalPriceCents;
        this.expireTime = new Date(expireTime);
    }

    clear() {
        this.items = [];
        this.consigneeAddress = "";
        this.consigneeName = "";
        this.consigneePhoneNumber = "";

        this.purchaseId = -1;
        this.totalPriceYuan = "";
        this.totalPriceCents = 0;
        this.expireTime = new Date();
    }
}

export default new ActiveOrderData();
