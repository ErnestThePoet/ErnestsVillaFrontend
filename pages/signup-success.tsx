import Head from "next/head";
import { observer } from "mobx-react-lite";
import { Button, Result } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import signupData from "../states/signup-data";
import styles from "../styles/signup-success.module.scss";

export default observer(function SignupSuccessPage() {
    const router = useRouter();

    const goToLogin = () => {
        router.push("/login");
    };

    useEffect(() => {
        signupData.startJumpCounter(goToLogin);

        if (!signupData.isSignupSuccessful) {
            goToLogin();
        }

        console.log(123);

        return () => {
            signupData.stopJumpCounter();
        };
    }, []);

    return (
        <div>
            <Head>
                <title>云安电子商城 - 注册成功</title>
            </Head>

            <header className={styles.header}>
                <div>
                    <img
                        className="logo"
                        src="/logo.png"
                        alt="logo"
                        onClick={() => router.push("/")}
                    />
                    <span className="welcome">注册成功</span>
                </div>
            </header>

            <Result
                status="success"
                title={`${signupData.signupAccount}，恭喜您成功注册云安电子商城账号！`}
                subTitle={`${signupData.jumpCounter}秒后自动回到登录页面。`}
                extra={<Button onClick={() => goToLogin()}>立即跳转</Button>}
            />
        </div>
    );
});
