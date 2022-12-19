export interface FormSubmitResult {
    success: boolean;
    msg: string;
}

export interface SingleItemPreview {
    itemId: number;
    name: string;
    previewImageFileName: string;
    priceYuan: string;
    purchaseCount: number;
}

export interface SingleItemDetail {
    itemId: number;
    sellerAccount: string;
    name: string;
    description: string;
    previewImageFileName: string;
    remaining: number;
    priceYuan: string;
    purchaseCount: number;
}

export interface SingleItemPurchaseWish {
    id: number;
    item: SingleItemDetail;
    count: number;
}

export type Bank = "YYH" | "HIT";

export interface BankAccountBindResult {
    bank1Success?: boolean;
    bank1Account?: string;

    bank2Success?: boolean;
    bank2Account?: string;
}

export interface SingleSellerPayment {
    sellerAccount: string;
    sellerBank1Account: string;
    sellerBank2Account: string;
    totalPriceYuan: string;
    totalPriceCents: number;
}

export interface SinglePurchasedItemDetail {
    purchaseId: number;
    sellerAccount: string;
    itemId: number;
    count: number;
    paymentYuan: string;
    purchaseTime: number;

    name: string;
    previewImageFileName: string;
}
