import { makeAutoObservable } from "mobx";

class SignupData {
    constructor() {
        makeAutoObservable(this);
    }

    isSignupSuccessful: boolean = false;
    signupAccount: string = "";

    setIsSignupSuccessful(value: boolean) {
        this.isSignupSuccessful = value;
    }

    setSignupAccount(value: string) {
        this.signupAccount = value;
    }
}

export default new SignupData();