import Head from "next/head";
import { observer } from "mobx-react-lite";
import { Button, Tabs } from "antd";
import * as L from "../logics/pay-order";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import signupSuccessPageData from "../states/signup-success-page-data";
import SiteBkg from "../components/site-bkg";
import activeOrderData from "../states/active-order-data";
import { tryAutoLogin } from "../logics/common";
import NavBar from "../components/nav-bar";
import styles from "../styles/pay-order.module.scss";
import { BankLoginPayForm } from "../components/pay-order/bank-login-pay-form";
import { FormSubmitResult } from "../modules/types";
import userData from "../states/user-data";
import SiteFooter from "../components/site-footer";

export default observer(function SignupSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        tryAutoLogin(L.fetchUnpaidPurchase);

        return () => {
            signupSuccessPageData.stopJumpCounter();
        };
    }, []);

    const [isBank1Pay, setIsBank1Pay] = useState(false);
    const [isBank2Pay, setIsBank2Pay] = useState(false);

    const [isBank1LoginLoading, setIsBank1LoginLoading] = useState(false);
    const [isBank1PayLoading, setIsBank1PayLoading] = useState(false);
    const [isBank2LoginLoading, setIsBank2LoginLoading] = useState(false);
    const [isBank2PayLoading, setIsBank2PayLoading] = useState(false);

    const [bank1LoginResult, setBank1LoginResult] = useState<FormSubmitResult>({
        success: true,
        msg: ""
    });

    const [bank1PayResult, setBank1PayResult] = useState<FormSubmitResult>({
        success: true,
        msg: ""
    });

    const [bank2LoginResult, setBank2LoginResult] = useState<FormSubmitResult>({
        success: true,
        msg: ""
    });

    const [bank2PayResult, setBank2PayResult] = useState<FormSubmitResult>({
        success: true,
        msg: ""
    });

    const tabItems = [
        {
            label: "YYH Bank",
            key: "0",
            children: (
                <BankLoginPayForm
                    pay={isBank1Pay}
                    loginName="bank1_login"
                    payName="bank1_pay"
                    accountDisplay={userData.bank1Account}
                    loginLoading={isBank1LoginLoading}
                    payLoading={isBank1PayLoading}
                    loginResult={bank1LoginResult}
                    payResult={bank1PayResult}
                    onLoginFinish={() => {}}
                    onPayFinish={() => {}}
                />
            )
        },
        {
            label: "HIT Bank",
            key: "1",
            children: (
                <BankLoginPayForm
                    pay={isBank2Pay}
                    loginName="bank2_login"
                    payName="bank2_pay"
                    accountDisplay={userData.bank2Account}
                    loginLoading={isBank2LoginLoading}
                    payLoading={isBank2PayLoading}
                    loginResult={bank2LoginResult}
                    payResult={bank2PayResult}
                    onLoginFinish={() => {}}
                    onPayFinish={() => {}}
                />
            )
        }
    ];

    return (
        <div>
            <Head>
                <title>云安电子商城 - 支付订单</title>
            </Head>

            <NavBar />

            <main className={styles.main}>
                <SiteBkg />

                <div className={styles.divWrapper}>
                    <div className={styles.divUpper}>
                        <div className={styles.divPaymentInfo}>
                            <div className="order-number">
                                订单编号：<b>{activeOrderData.purchaseId}</b>
                            </div>

                            <div className="price">
                                待支付：
                                <span className="price-value">
                                    <em>￥</em>
                                    {activeOrderData.totalPriceYuan}
                                </span>
                            </div>
                        </div>

                        <div className={styles.divExpireCounter}>
                            请在
                            <span className="expire-time">
                                {activeOrderData.expireCounterString}
                            </span>
                            内完成支付，超时订单自动取消
                        </div>
                    </div>

                    <div className={styles.divFormWrapper}>
                        <Tabs items={tabItems} centered />
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
});
