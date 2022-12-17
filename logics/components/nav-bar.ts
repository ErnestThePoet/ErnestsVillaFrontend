import axios from "axios";
import Router from "next/router";
import APIS from "../../modules/apis";
import activeOrderData from "../../states/active-order-data";
import createOrderData from "../../states/create-order-data";
import shoppingCartData from "../../states/shopping-cart-data";
import userData from "../../states/user-data";

export const logout = () => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId !== null && sessionId.length > 25) {
        axios.putForm(APIS.logout, { sessionId });
    }

    localStorage.removeItem("sessionId");

    userData.clear();
    shoppingCartData.clear();
    createOrderData.clear();
    activeOrderData.clear();

    Router.push("/");
};
