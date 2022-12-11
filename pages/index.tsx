import Head from "next/head";
import { observer } from "mobx-react-lite";
import { Button, Badge, Input } from "antd";
import { ShoppingCartOutlined, SyncOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import Logo from "../components/logo";
import NavBar from "../components/nav-bar";
import SiteBkg from "../components/site-bkg";
import SiteFooter from "../components/site-footer";
import { tryAutoLogin } from "../logics/common";
import * as L from "../logics/index";
import styles from "../styles/index.module.scss";
import searchData from "../states/search-data";
import itemShowData from "../states/item-show-data";
import SingleShowedItem from "../components/single-showed-item";

const { Search } = Input;

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
                    <div className={styles.divSearchRow}>
                        <Logo size={60} />

                        <Search
                            placeholder="输入要搜索的宝贝名称"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            value={searchData.searchKeyWord}
                            onChange={e =>
                                searchData.setSearchKeyWord(e.target.value)
                            }
                            onSearch={() => L.submitSearch()}
                        />

                        <Badge count={16}>
                            <Button
                                icon={<ShoppingCartOutlined />}
                                size="large">
                                我的购物车
                            </Button>
                        </Badge>
                    </div>

                    <div className={styles.divItemShowWrapper}>
                        <div
                            className="refresh"
                            onClick={() => L.fetchRecommendedItems()}>
                            <SyncOutlined />
                            <div className="text">换一换</div>
                        </div>
                        {itemShowData.showedItems.slice(0, 16).map((x, i) => (
                            <SingleShowedItem key={i} item={x} />
                        ))}
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
});
