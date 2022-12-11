import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import userData from "../states/user-data";

export const fetchCartData = () => {
    
}

export const tryAutoLogin = (
    onLogin?: () => void,
    gotoLoginOnFail: boolean = true
) => {
    if (userData.isLoggedIn) {
        return;
    }

    const gotoLogin = () => {
        Router.push("/login");
    };

    const sessionId = localStorage.getItem("sessionId");

    if (sessionId !== null && sessionId.length > 25) {
        axios
            .putForm(APIS.autoLogin, { sessionId })
            .then(res => {
                if (res.data.success) {
                    userData.setLoginUserData(
                        res.data.account,
                        res.data.accessId
                    );
                    if (onLogin !== undefined) {
                        onLogin();
                    }
                } else if (gotoLoginOnFail) {
                    gotoLogin();
                }
            })
            .catch(() => {
                if (gotoLoginOnFail) {
                    gotoLogin();
                }
            });
    } else if (gotoLoginOnFail) {
        gotoLogin();
    }
};
