import axios, { AxiosResponse } from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import userData from "../states/user-data";
import { message } from "antd";
import activeOrderData from "../states/active-order-data";
import type {
    SetFormSubmitResultFn,
    SetLoadingFn,
    SetStateFn
} from "../modules/fn-types";
import { getBankApis } from "../modules/bank-apis";
import type { Bank } from "../modules/types";
import CryptoES from "crypto-es";
import { BANK_MONKING } from "../modules/url-env.mjs";

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
                } else {
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

export function cancelOrder() {
    axios
        .delete(APIS.cancelOrder, {
            params: {
                accessId: userData.accessId,
                purchaseId: activeOrderData.purchaseId
            }
        })
        .then(res => {
            if (res.data.success) {
                message.info("订单已取消");
                Router.push("/");
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
    message.info("订单超时，已取消");
    Router.push("/");
}

export function bankLogin(
    bank: Bank,
    password: string,
    setIsPay: SetStateFn<boolean>,
    setLoading: SetLoadingFn,
    setResult: SetFormSubmitResultFn,
    setAccessId: SetStateFn<string>
) {
    if (BANK_MONKING) {
        setAccessId("acc");
        setResult({
            success: true,
            msg: ""
        });
        setIsPay(true);
        return;
    }

    setLoading(true);

    const BANK_APIS = getBankApis(bank);
    const postFunction = bank === "YYH" ? axios.postForm : axios.post;
    const account =
        bank === "YYH" ? userData.bank1Account : userData.bank2Account;

    postFunction(BANK_APIS.login, {
        account,
        password
    })
        .then(res => {
            if (res.data.success) {
                setAccessId(res.data.accessId);
                setResult({
                    success: true,
                    msg: ""
                });
                setIsPay(true);
            } else {
                setResult({
                    success: false,
                    msg: res.data.msg
                });
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        })
        .finally(() => setLoading(false));
}

export function bankPay(
    bank: Bank,
    bankAccessId: string,
    paymentPassword: string,
    setLoading: SetLoadingFn,
    setResult: SetFormSubmitResultFn,
    setSuccess: SetStateFn<boolean>
) {
    setLoading(true);

    const BANK_APIS = getBankApis(bank);
    const postFunction = bank === "YYH" ? axios.postForm : axios.post;

    const payPromises: Promise<AxiosResponse>[] = [];

    const timeStamp = new Date().getTime().toString();

    const oi: string = timeStamp + activeOrderData.purchaseId.toString();
    const oimd: CryptoES.lib.WordArray = CryptoES.SHA256(oi);
    const oimdBase64: string = CryptoES.enc.Base64.stringify(oimd);

    const villaPi: string =
        timeStamp + activeOrderData.totalPriceCents.toString();
    const villaPimd: CryptoES.lib.WordArray = CryptoES.SHA256(villaPi);
    const villaPimdBase64: string = CryptoES.enc.Base64.stringify(villaPimd);

    // POMD is also DS here
    const villaPomd: CryptoES.lib.WordArray = CryptoES.SHA256(
        villaPimd.clone().concat(oimd)
    );

    const villaDsBase64 = CryptoES.enc.Base64.stringify(villaPomd);

    if (BANK_MONKING) {
        setResult({
            success: true,
            msg: ""
        });

        confirmOrder(timeStamp, villaPimdBase64, villaDsBase64, setSuccess);

        return;
    }

    for (const i of activeOrderData.sellerPayments) {
        const pi: string = timeStamp + i.totalPriceCents.toString();
        const pimd: CryptoES.lib.WordArray = CryptoES.SHA256(pi);
        const pomd: CryptoES.lib.WordArray = CryptoES.SHA256(
            pimd.clone().concat(oimd)
        );

        const dsBase64: string = CryptoES.enc.Base64.stringify(pomd);

        const payeeAccount =
            bank === "YYH" ? i.sellerBank1Account : i.sellerBank2Account;

        payPromises.push(
            postFunction(BANK_APIS.pay, {
                accessId: bankAccessId,
                paymentPassword,
                payeeAccount,
                timeStamp,
                cents: i.totalPriceCents,
                oimd: oimdBase64,
                ds: dsBase64
            })
        );

        Promise.all(payPromises)
            .then(res => {
                let isAllSuccess: boolean = true;
                for (const i of res) {
                    if (!i.data.success) {
                        setResult({
                            success: false,
                            msg: i.data.msg
                        });
                        isAllSuccess = false;
                        break;
                    }
                }

                if (isAllSuccess) {
                    setResult({
                        success: true,
                        msg: ""
                    });

                    confirmOrder(
                        timeStamp,
                        villaPimdBase64,
                        villaDsBase64,
                        setSuccess
                    );
                }
            })
            .catch(reason => {
                console.log(reason);
                message.error(reason.message);
            })
            .finally(() => setLoading(false));
    }
}

function confirmOrder(
    timeStamp: string,
    pimd: string,
    ds: string,
    setSuccess: SetStateFn<boolean>
) {
    axios
        .postForm(APIS.confirmOrder, {
            accessId: userData.accessId,
            purchaseId: activeOrderData.purchaseId,
            timeStamp,
            pimd,
            ds
        })
        .then(res => {
            if (res.data.success) {
                setSuccess(true);
                activeOrderData.clear();
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}
