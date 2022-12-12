import { makeAutoObservable } from "mobx";
import type { SingleItemPreview } from "../modules/types";

class ItemRecommendationData {
    constructor() {
        makeAutoObservable(this);
    }

    recommendations: SingleItemPreview[] = [];

    setRecommendations(value: SingleItemPreview[]) {
        this.recommendations = value;
    }
}

export default new ItemRecommendationData();