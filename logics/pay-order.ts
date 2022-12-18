import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import userData from "../states/user-data";
import { message } from "antd";
import activeOrderData from "../states/active-order-data";

export function fetchUnpaidPurchase() {
    axios
        .get(APIS.getUnpaidPurchase, {
            params: {
                accessId: userData.accessId
            }
        })
        .then(res => {
            if (res.data.success) {
                if (res.data.hasUnpaidPurchase) {
                    activeOrderData.setData(
                        res.data.purchaseId,
                        res.data.totalPriceYuan,
                        res.data.totalPriceCents,
                        res.data.expireTime,
                        res.data.sellerPayments
                    );
                    activeOrderData.startExpireCounter(onPaymentTimeout);
                }
                else {
                    activeOrderData.clear();
                }
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}

export function onPaymentTimeout() {
    axios
        .delete(APIS.cancelOrder, {
            params: {
                accessId: userData.accessId,
                purchaseId: activeOrderData.purchaseId
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

    activeOrderData.clear();
    message.error("订单超时，已取消");
    Router.push("/");
}
