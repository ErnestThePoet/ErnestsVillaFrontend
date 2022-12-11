import { makeAutoObservable } from "mobx";

export interface SingleShowedItem {
    itemId: number;
    name: string;
    previewImageFileName: string;
    priceCents: number;
    purchaseCount: number;
}

class ItemShowData{
    constructor() {
        makeAutoObservable(this);
    }

    showedItems: SingleShowedItem[] = [];

    setShowedItems(value: SingleShowedItem[]) {
        this.showedItems = value;
    }
}

export default new ItemShowData();