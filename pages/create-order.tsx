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
import type { SingleItemPurchaseWish } from "../modules/types";
import { ORANGE } from "../styles/common/theme";
import createOrderData from "../states/create-order-data";
import SingleOrderItem from "../components/single-order-item";
import { getItemTotalPriceYuan, getTotalPriceYuan } from "../modules/currency";
import {
    CONSIGNEE_ADDRESS_RULES,
    CONSIGNEE_NAME_RULES,
    CONSIGNEE_PHONE_NUMBER_RULES
} from "../modules/form-rules";
import { useRouter } from "next/router";

const columns: ColumnsType<SingleItemPurchaseWish> = [
    {
        title: "商品",
        align: "center",
        width: 500,
        dataIndex: "item",
        key: "item",
        render: x => <SingleOrderItem item={x} />
    },
    {
        title: "单价",
        align: "center",
        dataIndex: ["item", "priceYuan"],
        key: "priceYuan"
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
        key: "totalPriceYuan",
        render: (_, r) => getItemTotalPriceYuan(r)
    }
];

export default observer(function CreateOrderPage() {
    const router = useRouter();

    useEffect(() => {
        if (createOrderData.items.length === 0) {
            router.push("/");
        } else {
            tryAutoLogin();
        }
    }, []);

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Head>
                <title>云安电子商城 - 确认订单</title>
            </Head>

            <NavBar />

            <main className={styles.main}>
                <SiteBkg />

                <div className={styles.divWrapper}>
                    <div className="label">确认订单信息</div>
                    <Table
                        pagination={false}
                        columns={columns}
                        dataSource={createOrderData.items}
                    />

                    <div className="label consignee-info-label">
                        输入收件人信息
                    </div>

                    <div className={styles.divWrapperLower}>
                        <ConfigProvider
                            theme={{ token: { colorPrimary: ORANGE } }}>
                            <Form
                                className="form-consignee-info"
                                name="form_consignee_info"
                                labelCol={{ span: 4 }}
                                form={form}
                                initialValues={{ remember: true }}
                                onFinish={e =>
                                    L.submitOrder(
                                        e.consigneeName,
                                        e.consigneeAddress,
                                        e.consigneePhoneNumber,
                                        setLoading
                                    )
                                }>
                                <Form.Item
                                    name="consigneeName"
                                    label="收件人姓名"
                                    rules={CONSIGNEE_NAME_RULES}>
                                    <Input
                                        className="in-short"
                                        placeholder="请输入收件人姓名"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="consigneePhoneNumber"
                                    label="收件人联系方式"
                                    rules={CONSIGNEE_PHONE_NUMBER_RULES}>
                                    <Input
                                        className="in-short"
                                        placeholder="请输入收件人联系方式"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="consigneeAddress"
                                    label="收货地址"
                                    rules={CONSIGNEE_ADDRESS_RULES}>
                                    <Input.TextArea placeholder="请输入收货地址" />
                                </Form.Item>
                            </Form>
                        </ConfigProvider>

                        <div className="lower-right">
                            <div className="lower-right-lower">
                                <div className="total-price">
                                    <span className="total-price-label">
                                        实付款：
                                    </span>

                                    <span className="total-price-value">
                                        <em>￥</em>
                                        {getTotalPriceYuan(
                                            createOrderData.items
                                        )}
                                    </span>
                                </div>

                                <Button
                                    type="primary"
                                    block
                                    loading={loading}
                                    onClick={() => form.submit()}>
                                    提交订单
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
});
