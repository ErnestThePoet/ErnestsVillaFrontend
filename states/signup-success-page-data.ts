import { makeAutoObservable } from "mobx";

class SignupSuccessPageData {
    constructor() {
        makeAutoObservable(this);
    }

    isSignupSuccessful: boolean = false;
    signupAccount: string = "";

    jumpCounter: number = 10;

    private jumpCounterTimer: NodeJS.Timer | undefined = undefined;

    setIsSignupSuccessful(value: boolean) {
        this.isSignupSuccessful = value;
    }

    setSignupAccount(value: string) {
        this.signupAccount = value;
    }

    startJumpCounter(onEnd: () => void) {
        if (this.jumpCounterTimer !== undefined) {
            return;
        }

        this.jumpCounter = 10;
        this.jumpCounterTimer = setInterval(() => {
            this.jumpCounter--;
            if (this.jumpCounter <= 0) {
                this.stopJumpCounter();
                onEnd();
            }
        }, 1000);
    }

    stopJumpCounter() {
        if (this.jumpCounterTimer === undefined) {
            return;
        }

        clearInterval(this.jumpCounterTimer);
        this.jumpCounterTimer = undefined;
    }
}

export default new SignupSuccessPageData();
