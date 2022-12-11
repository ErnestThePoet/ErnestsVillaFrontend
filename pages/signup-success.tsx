import Head from "next/head";
import { observer } from "mobx-react-lite";
import { Button, Result } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import signupData from "../states/signup-data";
import PageHeaderSingleText from "../components/page-header-single-text";
import SiteBkg from "../components/site-bkg";

export default observer(function SignupSuccessPage() {
    const router = useRouter();

    const goToLogin = () => {
        signupData.setIsSignupSuccessful(false);
        router.push("/login");
    };

    useEffect(() => {
        signupData.startJumpCounter(goToLogin);

        if (!signupData.isSignupSuccessful) {
            goToLogin();
        }

        return () => {
            signupData.stopJumpCounter();
        };
    }, []);

    return (
        <div>
            <Head>
                <title>云安电子商城 - 注册成功</title>
            </Head>

            <SiteBkg />

            <PageHeaderSingleText headerText="注册成功" />

            <Result
                status="success"
                title={`${signupData.signupAccount}，恭喜您成功注册云安电子商城账号！`}
                subTitle={`${signupData.jumpCounter}秒后自动回到登录页面。`}
                extra={<Button onClick={() => goToLogin()}>立即跳转</Button>}
            />
        </div>
    );
});
