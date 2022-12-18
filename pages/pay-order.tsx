import Head from "next/head";
import { observer } from "mobx-react-lite";
import { Tabs, Result, Spin, Button, Modal, Empty } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import * as L from "../logics/pay-order";
import { useEffect, useState } from "react";
import SiteBkg from "../components/site-bkg";
import activeOrderData from "../states/active-order-data";
import { tryAutoLogin } from "../logics/common";
import NavBar from "../components/nav-bar";
import styles from "../styles/pay-order.module.scss";
import { BankLoginPayForm } from "../components/pay-order/bank-login-pay-form";
import { FormSubmitResult } from "../modules/types";
import userData from "../states/user-data";
import SiteFooter from "../components/site-footer";

const { confirm } = Modal;

export default observer(function SignupSuccessPage() {
    useEffect(() => {
        tryAutoLogin(L.fetchUnpaidPurchase);

        return () => {
            activeOrderData.stopExpireCounter();
        };
    }, []);

    const [success, setSuccess] = useState(false);

    const [isBank1Pay, setIsBank1Pay] = useState(false);
    const [isBank2Pay, setIsBank2Pay] = useState(false);

    const [bank1AccessId, setBank1AccessId] = useState("");
    const [bank2AccessId, setBank2AccessId] = useState("");

    const [isBank1LoginLoading, setIsBank1LoginLoading] = useState(false);
    const [isBank1PayLoading, setIsBank1PayLoading] = useState(false);
    const [isBank2LoginLoading, setIsBank2LoginLoading] = useState(false);
    const [isBank2PayLoading, setIsBank2PayLoading] = useState(false);

    const [bank1LoginResult, setBank1LoginResult] = useState<FormSubmitResult>({
        success: false,
        msg: ""
    });

    const [bank1PayResult, setBank1PayResult] = useState<FormSubmitResult>({
        success: false,
        msg: ""
    });

    const [bank2LoginResult, setBank2LoginResult] = useState<FormSubmitResult>({
        success: false,
        msg: ""
    });

    const [bank2PayResult, setBank2PayResult] = useState<FormSubmitResult>({
        success: false,
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
                    onLoginFinish={e =>
                        L.bankLogin(
                            "YYH",
                            e.password,
                            setIsBank1Pay,
                            setIsBank1LoginLoading,
                            setBank1LoginResult,
                            setBank1AccessId
                        )
                    }
                    onPayFinish={e =>
                        L.bankPay(
                            "YYH",
                            bank1AccessId,
                            e.paymentPassword,
                            setIsBank1PayLoading,
                            setBank1PayResult,
                            setSuccess
                        )
                    }
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
                    onLoginFinish={e =>
                        L.bankLogin(
                            "HIT",
                            e.password,
                            setIsBank2Pay,
                            setIsBank2LoginLoading,
                            setBank2LoginResult,
                            setBank2AccessId
                        )
                    }
                    onPayFinish={e =>
                        L.bankPay(
                            "HIT",
                            bank2AccessId,
                            e.paymentPassword,
                            setIsBank2PayLoading,
                            setBank2PayResult,
                            setSuccess
                        )
                    }
                />
            )
        }
    ];

    return (
        <div>
            <Head>
                <title>云安电子商城 - 待支付订单</title>
            </Head>

            <NavBar />

            <main className={styles.main}>
                <SiteBkg />

                {success ? (
                    <div className={styles.divWrapper}>
                        <div className={styles.divResultWrapper}>
                            <Result status="success" title="恭喜您购买成功！" />
                        </div>
                    </div>
                ) : activeOrderData.hasUnpaidPurchase ? (
                    <div className={styles.divWrapper}>
                        <div className={styles.divUpper}>
                            <div className={styles.divPaymentInfo}>
                                <div className="order-number">
                                    订单编号：
                                    <b>{activeOrderData.purchaseId}</b>
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

                            <Button
                                className={styles.buttonCancelOrder}
                                danger
                                onClick={() => {
                                    confirm({
                                        title: "取消订单",
                                        icon: <ExclamationCircleFilled />,
                                        content: "确定取消订单吗？",
                                        okText: "取消订单",
                                        cancelText: "不取消",
                                        onOk: () => L.cancelOrder()
                                    });
                                }}>
                                取消订单
                            </Button>
                        </div>

                        {bank1PayResult.success || bank2PayResult.success ? (
                            <div className={styles.divSpinWrapper}>
                                <Spin size="large" />
                            </div>
                        ) : (
                            <div className={styles.divFormWrapper}>
                                <Tabs items={tabItems} centered />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.divWrapper}>
                        <div className={styles.divEmptyWrapper}>
                            <Empty description="无待支付订单" />
                        </div>
                    </div>
                )}
            </main>

            <SiteFooter />
        </div>
    );
});
