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

    private expireTime: number = -1;
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
        this.expireTime = -1;
        this.sellerPayments = [];
    }

    startExpireCounter(onEnd: () => void) {
        if (this.expireCounterTimer !== undefined) {
            return;
        }

        this.expireCounterTimer = setInterval(() => {
            this.expireCounter = this.expireTime - new Date().getTime();
            if (this.expireTime !== -1 && this.expireCounter <= 0) {
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
        if (this.expireTime === -1) {
            return "--:--";
        }

        const toExpireTime = new Date(this.expireCounter);
        return `${toExpireTime.getUTCMinutes()}???${toExpireTime.getSeconds()}???`;
    }
}

export default new ActiveOrderData();
