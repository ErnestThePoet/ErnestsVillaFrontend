import axios from "axios";
import APIS from "../modules/apis";
import { message } from "antd";
import userData from "../states/user-data";
import shoppingCartData from "../states/shopping-cart-data";
import type { SetLoadingFn } from "../modules/fn-types";
import createOrderData from "../states/create-order-data";
import activeOrderData from "../states/active-order-data";
import Router from "next/router";

function clearServerShoppingCartData() {
    axios
        .delete(APIS.clearUserCart, {
            params: {
                accessId: userData.accessId
            }
        })
        .then(res => {
            if (!res.data.success) {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}

export function submitOrder(
    consigneeName: string,
    consigneeAddress: string,
    consigneePhoneNumber: string,
    setLoading: SetLoadingFn
) {
    setLoading(true);

    axios
        .post(APIS.createOrder, {
            accessId: userData.accessId,
            items: createOrderData.items.map(x => ({
                itemId: x.item.itemId,
                count: x.count
            })),
            consigneeName,
            consigneeAddress,
            consigneePhoneNumber
        })
        .then(res => {
            if (res.data.success) {
                activeOrderData.setData(
                    res.data.purchaseId,
                    res.data.totalPriceYuan,
                    res.data.totalPriceCents,
                    res.data.expireTime,
                    res.data.sellerPayments
                );

                createOrderData.clear();
                shoppingCartData.clear();

                clearServerShoppingCartData();

                Router.push("/pay-order");
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        })
        .finally(() => setLoading(false));
}
