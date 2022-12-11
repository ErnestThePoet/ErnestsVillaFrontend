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

    isLoading: boolean = true;
    
    setIsLoading(value:boolean) {
        this.isLoading = value;
    }

    showedItems: SingleShowedItem[] = [];

    setShowedItems(value: SingleShowedItem[]) {
        this.showedItems = value;
    }
}

export default new ItemShowData();