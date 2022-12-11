import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Tabs } from "antd";
import * as L from "../logics/login";
import { tryAutoLogin } from "../logics/common";
import styles from "../styles/login.module.scss";
import LoginForm from "../components/login/login-form";
import SignupForm from "../components/login/signup-form";
import SiteFooter from "../components/site-footer";
import PageHeaderSingleText from "../components/page-header-single-text";

const tabItems = [
    {
        label: "账号登录",
        key: "0",
        children: <LoginForm onFinish={L.login} />
    },
    {
        label: "立即注册",
        key: "1",
        children: <SignupForm onFinish={L.signup} />
    }
];

export default function LoginPage() {
    const router = useRouter();

    const [defaultActiveKey, setDafaultActiveKey] = useState("0");

    useEffect(() => {
        if (router.query.signup !== undefined) {
            setDafaultActiveKey("1");
        } else {
            tryAutoLogin(() => router.push("/"), false);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>云安电子商城 - 欢迎登录</title>
            </Head>

            <PageHeaderSingleText headerText="欢迎登录" />

            <main className={styles.main}>
                <div className="bkg-wrapper">
                    <div className="login-wrapper">
                        <Tabs
                            centered
                            items={tabItems}
                            activeKey={defaultActiveKey}
                            defaultActiveKey="0"
                            onChange={e => setDafaultActiveKey(e)}
                        />
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
