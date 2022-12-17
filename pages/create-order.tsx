import Head from "next/head";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { ConfigProvider, Table, Form, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import NavBar from "../components/nav-bar";
import SiteBkg from "../components/site-bkg";
import SiteFooter from "../components/site-footer";
import * as L from "../logics/create-order";
import { tryAutoLogin } from "../logics/common";
import styles from "../styles/create-order.module.scss";
import type {
    FormSubmitResult,
    SingleItemPurchaseWish
} from "../modules/types";
import { ORANGE } from "../styles/common/theme";
import createOrderData from "../states/create-order-data";
import SingleOrderItem from "../components/single-order-item";
import { getItemTotalPriceYuan } from "../modules/currency";

const columns: ColumnsType<SingleItemPurchaseWish> = [
    {
        title: "序号",
        key: "index",
        render: (_, __, i) => i
    },
    {
        title: "商品",
        dataIndex: "item",
        key: "item",
        render: x => <SingleOrderItem item={x} />
    },
    {
        title: "单价",
        dataIndex: ["item", "priceYuan"],
        key: "priceYuan"
    },
    {
        title: "数量",
        dataIndex: "count",
        key: "count"
    },
    {
        title: "小计",
        key: "totalPriceYuan",
        render: (_, r) => getItemTotalPriceYuan(r)
    }
];

export default observer(function CreateOrderPage() {
    useEffect(() => {
        tryAutoLogin();
    }, []);

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const [formResult, setFormResult] = useState<FormSubmitResult>({
        success: false,
        msg: ""
    });

    return (
        <ConfigProvider theme={{ token: { colorPrimary: ORANGE } }}>
            <div>
                <Head>
                    <title>云安电子商城 - 确认订单</title>
                </Head>

                <NavBar />

                <main className={styles.main}>
                    <SiteBkg />

                    <div className={styles.divWrapper}>
                        <div className="title">
                            确认订单信息
                        </div>
                        <Table
                            pagination={false}
                            columns={columns}
                            dataSource={createOrderData.items}
                        />
                        <Form
                            name="form_delivery_info"
                            form={form}
                            initialValues={{ remember: true }}
                            onFinish={e => {}}></Form>
                    </div>
                </main>

                <SiteFooter />
            </div>
        </ConfigProvider>
    );
});
