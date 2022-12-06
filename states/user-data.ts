import { makeAutoObservable } from "mobx";

class UserData {
    constructor() {
        makeAutoObservable(this);
    }

    account: string = "";
    name: string = "";
    accessId: string = "";

    setUserData(account: string, name: string, accessId: string) {
        this.account = account;
        this.name = name;
        this.accessId = accessId;
    }
}

export default new UserData();
