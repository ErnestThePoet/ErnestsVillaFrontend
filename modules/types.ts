export interface FormSubmitResult{
    success: boolean;
    msg: string;
}

export interface SingleItemPreview {
    itemId: number;
    name: string;
    previewImageFileName: string;
    priceCents: number;
    purchaseCount: number;
}