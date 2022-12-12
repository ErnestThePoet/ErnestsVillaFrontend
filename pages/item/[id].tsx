import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NavBar from "../../components/nav-bar";
import SiteBkg from "../../components/site-bkg";
import { tryAutoLogin } from "../../logics/common";
import * as L from "../../logics/item";
import type { SingleItemDetail } from "../../modules/types";
import userData from "../../states/user-data";
import styles from "../../styles/item.module.scss";

export default function ItemPage() {
    const router = useRouter();

    const [detail, setDetail] = useState<SingleItemDetail>();

    const getItemDetail = () => {
        if (router.isReady && userData.isLoggedIn) {
            L.getItemDetail(parseInt(router.query.id as string), setDetail);
        }
    };

    useEffect(() => {
        tryAutoLogin(getItemDetail);
    }, []);

    useEffect(() => {
        getItemDetail();
    }, [router.query]);

    return (
        <div className="overflow-x-hidden">
            <Head>
                <title>
                    {`${
                        detail === undefined ? "商品详情" : detail.name
                    } - 云安电子商城`}
                </title>
            </Head>

            <NavBar />

            <main className={styles.main}>
                <SiteBkg />
            </main>
        </div>
    );
}
