import { makeAutoObservable } from "mobx";
import type { SingleItemPreview } from "../modules/types";

class SearchResultData {
    constructor() {
        makeAutoObservable(this);
    }

    results: SingleItemPreview[] = [];

    setResults(value: SingleItemPreview[]) {
        this.results = value;
    }
}

export default new SearchResultData();
