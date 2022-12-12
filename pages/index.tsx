import Head from "next/head";
import { Empty } from "antd";
import { observer } from "mobx-react-lite";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import NavBar from "../components/nav-bar";
import SiteBkg from "../components/site-bkg";
import SiteFooter from "../components/site-footer";
import { tryAutoLogin } from "../logics/common";
import * as L from "../logics/index";
import styles from "../styles/index.module.scss";
import itemRecommendationData from "../states/item-recommendation-data";
import SingleItemRecommendation from "../components/single-item-recommendation";
import SearchRow from "../components/search-row";

export default observer(function HomePage() {
    useEffect(() => {
        tryAutoLogin(undefined, false);
        L.fetchRecommendedItems();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <Head>
                <title>云安电子商城</title>
            </Head>

            <NavBar />

            <main className={styles.main}>
                <SiteBkg />

                <div className={styles.divContentWrapper}>
                    <SearchRow />

                    {itemRecommendationData.recommendations.length === 0 ? (
                        <div className={styles.divEmptyWrapper}>
                            <Empty description="未搜索到任何商品" />
                        </div>
                    ) : (
                        <div className={styles.divItemShowWrapper}>
                            <div
                                className="refresh"
                                onClick={() => L.fetchRecommendedItems()}>
                                <SyncOutlined />
                                <div className="text">换一换</div>
                            </div>
                            {itemRecommendationData.recommendations
                                .slice(0, 16)
                                .map((x, i) => (
                                    <SingleItemRecommendation
                                        key={i}
                                        item={x}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
});
