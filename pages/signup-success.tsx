import Head from "next/head";
import { Button, Result } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import signupData from "../states/signup-data";
import LoginHeader from "../components/login/login-header";

let jumpCounterTimer;

export default function SignupSuccessPage() {
    const router = useRouter();

    const goToLogin = () => {
        router.push("/login");
    };

    const [jumpCounter, setJumpCounter] = useState(10);

    useEffect(() => {
        if (!signupData.isSignupSuccessful) {
            goToLogin();
        }

        jumpCounterTimer = setInterval(() => {
            setJumpCounter(jumpCounter - 1);
            if (jumpCounter === 0) {
                clearInterval(jumpCounterTimer);
                goToLogin();
            }
        });
    }, []);

    return (
        <div>
            <Head>
                <title>云安电子商城 - 注册成功</title>
            </Head>

            <LoginHeader />

            <Result
                status="success"
                title={`${signupData.signupAccount}，恭喜您成功注册云安电子商城账号！`}
                subTitle={`${jumpCounter}秒后自动回到登录页面。`}
                extra={
                    <Button
                        onClick={() => {
                            clearInterval(jumpCounterTimer);
                            goToLogin();
                        }}>
                        立即跳转
                    </Button>
                }
            />
        </div>
    );
}
