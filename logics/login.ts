import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import userData from "../states/user-data";
import { message } from "antd";
import type { BankAccountBindResult } from "../modules/types";
import signupSuccessPageData from "../states/signup-success-page-data";
import type { SetFormSubmitResultFn, SetLoadingFn } from "../modules/fn-types";

export const login = (
    account: string,
    password: string,
    remember: boolean,
    setIsLoggingIn: SetLoadingFn,
    setLoginResult: SetFormSubmitResultFn
) => {
    setIsLoggingIn(true);

    axios
        .putForm(APIS.login, {
            account,
            password,
            remember
        })
        .then(res => {
            if (res.data.success) {
                userData.setLoginUserData(
                    res.data.account,
                    res.data.bank1Account,
                    res.data.bank2Account,
                    res.data.accessId
                );

                if (remember) {
                    localStorage.setItem("sessionId", res.data.sessionId);
                }

                setLoginResult({
                    success: true,
                    msg: ""
                });

                Router.push("/");
            } else {
                setLoginResult({
                    success: false,
                    msg: res.data.msg
                });
            }
        })
        .catch(reason => {
            message.error(reason.message);
            console.log(reason);
        })
        .finally(() => setIsLoggingIn(false));
};

export const signup = (
    account: string,
    password: string,
    passwordConfirm: string,
    bankAccountBindResult: BankAccountBindResult,
    setIsSigningUp: SetLoadingFn,
    setSignupResult: SetFormSubmitResultFn
) => {
    if (password !== passwordConfirm) {
        setSignupResult({
            success: false,
            msg: "两次密码输入不一致"
        });

        return;
    }

    if (!bankAccountBindResult.bank1Success) {
        setSignupResult({
            success: false,
            msg: "YYH Bank网银账号认证未完成"
        });

        return;
    }

    if (!bankAccountBindResult.bank2Success) {
        setSignupResult({
            success: false,
            msg: "HIT Bank网银账号认证未完成"
        });

        return;
    }

    setIsSigningUp(true);

    axios
        .postForm(APIS.signup, {
            account,
            bank1Account: bankAccountBindResult.bank1Account,
            bank2Account: bankAccountBindResult.bank2Account,
            password
        })
        .then(res => {
            if (res.data.success) {
                setSignupResult({
                    success: true,
                    msg: ""
                });

                // this branch may not execute finally
                setIsSigningUp(false);

                signupSuccessPageData.setIsSignupSuccessful(true);
                signupSuccessPageData.setSignupAccount(account);

                Router.push("/signup-success");
            } else {
                setSignupResult({
                    success: false,
                    msg: res.data.msg
                });
            }
        })
        .catch(reason => {
            message.error(reason.message);
            console.log(reason);
        })
        .finally(() => setIsSigningUp(false));
};
