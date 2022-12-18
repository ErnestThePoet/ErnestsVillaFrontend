import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import { message } from "antd";
import userData from "../states/user-data";
import shoppingCartData from "../states/shopping-cart-data";
import type { SetLoadingFn } from "../modules/fn-types";

export function submitOrder(
    consigneeName:string,
    consigneeAddress:string,
    consigneePhoneNumber: string,
    setLoading:SetLoadingFn
) {
    setLoading(true);

    axios.post()
}