import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Tabs } from "antd";
import styles from "../styles/login.module.scss";
import LoginForm from "../components/login/login-form";
import SignupForm from "../components/login/signup-form";
import SiteFooter from "../components/site-footer";

const tabItems = [
    {
        label: "账号登录",
        key: "0",
        children: <LoginForm />
    },
    {
        label: "立即注册",
        key: "1",
        children: <SignupForm />
    }
];

export default function LoginPage() {
    const router = useRouter();

    const [defaultActiveKey, setDafaultActiveKey] = useState("0");

    useEffect(() => {
        setDafaultActiveKey(router.query.signup ? "1" : "0");
    }, []);

    return (
        <div>
            <Head>
                <title>云安电子商城 - 欢迎登录</title>
            </Head>

            <header className={styles.header}>
                <div>
                    <img
                        className="logo"
                        src="/logo.png"
                        alt="logo"
                        onClick={() => router.push("/")}
                    />
                    <span className="welcome">欢迎登录</span>
                </div>
            </header>

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
