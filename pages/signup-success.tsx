import Head from "next/head";
import { observer } from "mobx-react-lite";
import { Button, Result } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import signupSuccessPageData from "../states/signup-success-page-data";
import PageHeaderSingleText from "../components/page-header-single-text";
import SiteBkg from "../components/site-bkg";

export default observer(function SignupSuccessPage() {
    const router = useRouter();

    const goToLogin = () => {
        signupSuccessPageData.setIsSignupSuccessful(false);
        router.push("/login");
    };

    useEffect(() => {
        signupSuccessPageData.startJumpCounter(goToLogin);

        if (!signupSuccessPageData.isSignupSuccessful) {
            goToLogin();
        }

        return () => {
            signupSuccessPageData.stopJumpCounter();
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
                title={`${signupSuccessPageData.signupAccount}，恭喜您成功注册云安电子商城账号！`}
                subTitle={`${signupSuccessPageData.jumpCounter}秒后自动回到登录页面。`}
                extra={<Button onClick={() => goToLogin()}>立即跳转</Button>}
            />
        </div>
    );
});
