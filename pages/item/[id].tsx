import { ConfigProvider, InputNumber, Divider, Empty } from "antd";
import { PlusOutlined, MinusOutlined, ShopTwoTone } from "@ant-design/icons";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NavBar from "../../components/nav-bar";
import SearchRow from "../../components/search-row";
import SiteBkg from "../../components/site-bkg";
import SiteFooter from "../../components/site-footer";
import { tryAutoLogin } from "../../logics/common";
import * as L from "../../logics/item/item";
import CDNS, { getCdnUrl } from "../../modules/cdns";
import type { SingleItemDetail } from "../../modules/types";
import userData from "../../states/user-data";
import { ORANGE } from "../../styles/common/theme";
import styles from "../../styles/item/item.module.scss";

export default function ItemPage() {
    const router = useRouter();

    const [detail, setDetail] = useState<SingleItemDetail>();

    const [count, setCount] = useState(1);

    const changeCount = (op: "INC" | "DEC") => {
        switch (op) {
            case "INC":
                return () => {
                    if (
                        detail?.remaining !== undefined &&
                        count < detail.remaining
                    ) {
                        setCount(count + 1);
                    }
                };
            case "DEC":
                return () => {
                    if (count > 1) {
                        setCount(count - 1);
                    }
                };
        }
    };

    const getItemDetail = () => {
        if (userData.isLoggedIn) {
            L.getItemDetail(parseInt(router.query.id as string), setDetail);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            tryAutoLogin(getItemDetail);
        }
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

            <div className={styles.divSearchRowWrapper}>
                <SearchRow />
            </div>

            <ConfigProvider theme={{ token: { colorPrimary: ORANGE } }}>
                <main className={styles.main}>
                    <SiteBkg />

                    {detail === undefined ? (
                        <div className={styles.divContentWrapper}>
                            <div className={styles.divEmptyWrapper}>
                                <Empty description="您访问的商品不存在哦" />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.divContentWrapper}>
                            <div className={styles.divUpper}>
                                <img
                                    className={styles.imgPreview}
                                    src={getCdnUrl(
                                        CDNS.images,
                                        detail.previewImageFileName
                                    )}
                                    alt="preview"
                                />

                                <div className={styles.divUpperRight}>
                                    <div className="name">{detail.name}</div>

                                    <div className="seller">
                                        <ShopTwoTone className="seller-icon" />
                                        {detail.sellerAccount}
                                    </div>

                                    <div className="purchase-count">
                                        云安销量 {detail.purchaseCount}
                                    </div>

                                    <div className="price">
                                        <em>￥</em>
                                        {detail.priceYuan}
                                    </div>

                                    <div className="count">
                                        <span className="count-label">
                                            数量：
                                        </span>

                                        <InputNumber
                                            className="in-count"
                                            controls={false}
                                            addonBefore={
                                                <div
                                                    className="count-control"
                                                    onClick={changeCount(
                                                        "DEC"
                                                    )}>
                                                    <MinusOutlined />
                                                </div>
                                            }
                                            addonAfter={
                                                <div
                                                    className="count-control"
                                                    onClick={changeCount(
                                                        "INC"
                                                    )}>
                                                    <PlusOutlined />
                                                </div>
                                            }
                                            value={count}
                                            onChange={e =>
                                                setCount(e as number)
                                            }
                                            min={1}
                                            max={detail.remaining}
                                            step={1}
                                        />

                                        <span className="remaining">
                                            {detail.remaining > 0
                                                ? `有货 · 库存${detail.remaining}件`
                                                : "无货"}
                                        </span>
                                    </div>

                                    {detail.sellerAccount ===
                                    userData.account ? (
                                        <div className="buttons">
                                            <button
                                                className="manage"
                                                onClick={() =>
                                                    router.push(
                                                        "/item/management/" +
                                                            router.query.id
                                                    )
                                                }>
                                                管理商品
                                            </button>
                                        </div>
                                    ) : detail.remaining > 0 ? (
                                        <div className="buttons">
                                            <button className="buy">
                                                立即购买
                                            </button>
                                            <button className="add-cart">
                                                添加到购物车
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="sold-out">暂时无货</div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.divLower}>
                                <div className="description-title">
                                    商品详情
                                </div>

                                <Divider />

                                <div className="description">
                                    {detail.description}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </ConfigProvider>

            <SiteFooter />
        </div>
    );
}
