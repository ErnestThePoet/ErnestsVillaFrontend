import { makeAutoObservable } from "mobx";

class UserData {
    constructor() {
        makeAutoObservable(this);
    }

    account: string = "";
    bank1Account: string = "";
    bank2Account: string = "";
    accessId: string = "";

    isLoggedIn: boolean = false;

    setLoginUserData(
        account: string,
        bank1Account: string,
        bank2Account: string,
        accessId: string
    ) {
        this.account = account;
        this.bank1Account = bank1Account;
        this.bank2Account = bank2Account;
        this.accessId = accessId;
        this.isLoggedIn = true;
    }

    clear() {
        this.account = "";
        this.bank1Account = "";
        this.bank2Account = "";
        this.accessId = "";
        this.isLoggedIn = false;
    }
}

export default new UserData();
