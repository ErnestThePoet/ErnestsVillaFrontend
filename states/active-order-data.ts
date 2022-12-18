import { makeAutoObservable } from "mobx";
import type { SingleSellerPayment } from "../modules/types";

class ActiveOrderData {
    constructor() {
        makeAutoObservable(this);
    }

    hasUnpaidPurchase: boolean = false;

    purchaseId: number = -1;
    totalPriceYuan: string = "";
    totalPriceCents: number = 0;

    sellerPayments: SingleSellerPayment[] = [];

    private expireTime: number = 0;
    private expireCounter: number = 0;

    private expireCounterTimer: NodeJS.Timer | undefined = undefined;

    setData(
        purchaseId: number,
        totalPriceYuan: string,
        totalPriceCents: number,
        expireTime: number,
        sellerPayments: SingleSellerPayment[]
    ) {
        this.hasUnpaidPurchase = true;
        this.purchaseId = purchaseId;
        this.totalPriceYuan = totalPriceYuan;
        this.totalPriceCents = totalPriceCents;
        this.expireTime = expireTime;
        this.sellerPayments = sellerPayments;
    }

    clear() {
        this.hasUnpaidPurchase = false;
        this.purchaseId = -1;
        this.totalPriceYuan = "";
        this.totalPriceCents = 0;
        this.expireTime = 0;
        this.sellerPayments = [];
    }

    startExpireCounter(onEnd: () => void) {
        if (this.expireCounterTimer !== undefined) {
            return;
        }

        this.expireCounterTimer = setInterval(() => {
            this.expireCounter = new Date().getTime() - this.expireTime;
            if (this.expireCounter <= 0) {
                this.stopExpireCounter();
                onEnd();
            }
        }, 1000);
    }

    stopExpireCounter() {
        if (this.expireCounterTimer === undefined) {
            return;
        }

        clearInterval(this.expireCounterTimer);
        this.expireCounterTimer = undefined;
    }

    get expireCounterString(): string {
        const toExpireTime = new Date(this.expireCounter);
        return `${toExpireTime.getUTCMinutes()}分${toExpireTime.getSeconds()}秒`;
    }
}

export default new ActiveOrderData();
