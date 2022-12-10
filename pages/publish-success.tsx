import Head from "next/head";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { tryAutoLogin } from "../logics/common";
import { Result } from "antd";
import PageHeaderSingleText from "../components/page-header-single-text";
import SiteBkg from "../components/site-bkg";

export default observer(function SignupSuccessPage() {
    useEffect(() => {
        tryAutoLogin();
    }, []);

    return (
        <div>
            <Head>
                <title>云安电子商城 - 商品发布成功</title>
            </Head>

            <SiteBkg />

            <PageHeaderSingleText headerText="商品发布成功" />

            <Result status="success" title={`恭喜，您的商品发布成功！`} />
        </div>
    );
});
