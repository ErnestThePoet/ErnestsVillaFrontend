import { makeAutoObservable } from "mobx";

class UserData {
    constructor() {
        makeAutoObservable(this);
    }

    account: string = "";
    accessId: string = "";
    isLoggedIn: boolean = false;

    setLoginUserData(account: string, accessId: string) {
        this.account = account;
        this.accessId = accessId;
        this.isLoggedIn = true;
    }
}

export default new UserData();
