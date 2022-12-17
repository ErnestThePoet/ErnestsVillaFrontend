import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import { message } from "antd";
import userData from "../states/user-data";
import shoppingCartData from "../states/shopping-cart-data";

export const fetchCartData = () => {
    axios
        .get(APIS.getCartItems, {
            params: {
                accessId: userData.accessId
            }
        })
        .then(res => {
            if (res.data.success) {
                shoppingCartData.setCartItems(res.data.cartItems);
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
};

export const tryAutoLogin = (
    onLogin?: () => void,
    gotoLoginOnFail: boolean = true
) => {
    if (userData.isLoggedIn) {
        if (onLogin !== undefined) {
            fetchCartData();
            onLogin();
        }
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
                        res.data.bank1Account,
                        res.data.bank2Account,
                        res.data.accessId
                    );
                    if (onLogin !== undefined) {
                        fetchCartData();
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
