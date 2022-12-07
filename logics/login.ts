import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import userData from "../states/user-data";
import { message } from "antd";
import { FormSubmitResult } from "../modules/types";
import signupData from "../states/signup-data";

export const tryAutoLogin = () => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId !== null && sessionId.length > 25) {
        axios.postForm(APIS.autoLogin, { sessionId }).then(res => {
            if (res.data.success) {
                userData.setLoginUserData(res.data.account, res.data.accessId);
            }
        });
    }
};

export const login = (
    setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>,
    setLoginResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>
) => {
    const account = (<HTMLInputElement>(
        document.getElementById("in-login-account")
    )).value;

    const password = (<HTMLInputElement>(
        document.getElementById("in-login-password")
    )).value;

    const remember = (<HTMLInputElement>document.getElementById("cb-remember"))
        .checked;

    setIsLoggingIn(true);

    axios
        .postForm(APIS.login, {
            account,
            password,
            remember
        })
        .then(res => {
            if (res.data.success) {
                userData.setLoginUserData(res.data.account, res.data.accessId);

                if (remember) {
                    localStorage.setItem("sessionId", res.data.sessionId);
                }

                setLoginResult({
                    success: true,
                    msg: ""
                });
            } else {
                setLoginResult({
                    success: false,
                    msg: res.data.msg
                });
            }
        })
        .catch(reason => console.log(reason))
        .finally(() => setIsLoggingIn(false));
};

export const signup = (
    setIsSigningUp: React.Dispatch<React.SetStateAction<boolean>>,
    setSignupResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>
) => {
    const account = (<HTMLInputElement>(
        document.getElementById("in-signup-account")
    )).value;

    const password = (<HTMLInputElement>(
        document.getElementById("in-signup-password")
    )).value;

    const passwordConfirm = (<HTMLInputElement>(
        document.getElementById("in-signup-password-confirm")
    )).value;

    if (password !== passwordConfirm) {
        setSignupResult({
            success: false,
            msg: "两次密码输入不一致"
        });

        return;
    }

    setIsSigningUp(true);

    axios
        .postForm(APIS.signup, {
            account,
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

                signupData.setIsSignupSuccessful(true);
                signupData.setSignupAccount(account);

                Router.push("/signup-success");
            } else {
                setSignupResult({
                    success: false,
                    msg: res.data.msg
                });
            }
        })
        .catch(reason => console.log(reason))
        .finally(() => setIsSigningUp(false));
};
