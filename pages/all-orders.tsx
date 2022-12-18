import Head from "next/head";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import NavBar from "../components/nav-bar";
import SiteBkg from "../components/site-bkg";
import SiteFooter from "../components/site-footer";
import * as L from "../logics/all-orders";
import { tryAutoLogin } from "../logics/common";
import styles from "../styles/all-orders.module.scss";
import type { SinglePurchasedItemDetail } from "../modules/types";
import SingleOrderItem from "../components/single-order-item";
import { getDateTimeStr } from "../modules/date-util";

const columns: ColumnsType<SinglePurchasedItemDetail> = [
    {
        title: "订单编号",
        align: "center",
        dataIndex: "purchaseId",
        key: "purchaseId"
    },
    {
        title: "购买时间",
        align: "center",
        dataIndex: "purchaseTime",
        key: "purchaseTime",
        render: x => getDateTimeStr(new Date(x))
    },
    {
        title: "商品",
        align: "center",
        key: "item",
        render: (_, r) => <SingleOrderItem item={r} />
    },
    {
        title: "数量",
        align: "center",
        dataIndex: "count",
        key: "count"
    },
    {
        title: "小计",
        align: "center",
        dataIndex: "paymentYuan",
        key: "paymentYuan"
    }
];

export default observer(function AllOrdersPage() {
    useEffect(() => {
        tryAutoLogin(() => L.fetchPurchases(setDetails));
    }, []);

    const [details, setDetails] = useState<SinglePurchasedItemDetail[]>([]);

    return (
        <div>
            <Head>
                <title>云安电子商城 - 所有订单</title>
            </Head>

            <NavBar />

            <main className={styles.main}>
                <SiteBkg />

                <div className={styles.divWrapper}>
                    <Table
                        pagination={false}
                        columns={columns}
                        dataSource={details}
                    />
                </div>
            </main>

            <SiteFooter />
        </div>
    );
});
