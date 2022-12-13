export interface FormSubmitResult{
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