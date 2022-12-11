import { makeAutoObservable } from "mobx";

class SearchData{
    constructor() {
        makeAutoObservable(this);
    }

    searchKeyWord: string = "";

    setSearchKeyWord(value: string) {
        this.searchKeyWord = value;
    }
}

export default new SearchData();