import Head from "next/head";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    ConfigProvider,
    Empty,
    Form,
    Input,
    InputNumber,
    Upload,
    Row,
    Col,
    Button,
    Result,
    message,
    Space
} from "antd";
import NavBar from "../../../components/nav-bar";
import SiteBkg from "../../../components/site-bkg";
import SiteFooter from "../../../components/site-footer";
import * as L from "../../../logics/item/management/management";
import { tryAutoLogin } from "../../../logics/common";
import styles from "../../../styles/item/management/management.module.scss";
import APIS from "../../../modules/apis";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import CDNS, { getCdnUrl } from "../../../modules/cdns";
import type {
    FormSubmitResult,
    SingleItemDetail
} from "../../../modules/types";
import PageHeaderSingleText from "../../../components/page-header-single-text";
import { ORANGE } from "../../../styles/common/theme";
import { useRouter } from "next/router";
import userData from "../../../states/user-data";

export default function ManageItemPage() {
    const router = useRouter();

    const [itemId, setItemId] = useState(-1);

    const [isDetailFetched, setIsDetailFetched] = useState(false);

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");

    const [previewImageFileName, setPreviewImageFileName] = useState("");

    const [formResult, setFormResult] = useState<FormSubmitResult>({
        success: false,
        msg: ""
    });

    const setDetail = (detail: SingleItemDetail) => {
        if (detail.sellerAccount !== userData.account) {
            router.push("/");
            return;
        }

        form.setFieldsValue({
            name: detail.name,
            description: detail.description,
            remaining: detail.remaining,
            priceYuan: detail.priceYuan
        });

        setPreviewImageUrl(getCdnUrl(CDNS.images, detail.previewImageFileName));
        setPreviewImageFileName(detail.previewImageFileName);

        setIsDetailFetched(true);
    };

    const getItemDetail = () => {
        if (userData.isLoggedIn) {
            const itemIdQuery = parseInt(router.query.mid as string);
            setItemId(itemIdQuery);
            L.getItemDetail(itemIdQuery, setDetail);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            tryAutoLogin(getItemDetail);
        }
    }, [router.query]);

    const beforeUpload = (file: RcFile) => {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error("商品图片不能超过1M");
        }
        return isLt1M;
    };

    const onUploadChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            setLoading(false);
            setPreviewImageUrl(
                getCdnUrl(CDNS.images, info.file.response.previewImageFileName)
            );
            setPreviewImageFileName(info.file.response.previewImageFileName);
        }
    };

    const onFormValuesChange = (e, _) => {
        if (e.remaining !== undefined) {
            form.setFieldValue("remaining", Math.floor(e.remaining));
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: ORANGE } }}>
            <div>
                <Head>
                    <title>云安电子商城 - 商品管理</title>
                </Head>

                <NavBar />

                <PageHeaderSingleText headerText="商品管理" />

                <main className={styles.main}>
                    <SiteBkg />

                    <div className="div-form-wrapper">
                        {isDetailFetched ? (
                            formResult.success ? (
                                <div className="result-wrapper">
                                    <Result status="success" title="操作成功" />
                                </div>
                            ) : (
                                <Form
                                    name="form_manage_item"
                                    form={form}
                                    initialValues={{ remember: true }}
                                    onValuesChange={onFormValuesChange}
                                    onFinish={e =>
                                        L.updateItem(
                                            itemId,
                                            e.name,
                                            e.description,
                                            previewImageFileName,
                                            e.remaining,
                                            e.priceYuan,
                                            setLoading,
                                            setFormResult
                                        )
                                    }>
                                    <Row gutter={100}>
                                        <Col>
                                            <Form.Item
                                                name="previewImage"
                                                label="上传商品图片">
                                                <Upload
                                                    accept="image/jpeg,image/png,image/webp"
                                                    action={
                                                        APIS.uploadPreviewImage
                                                    }
                                                    name="previewImage"
                                                    listType="picture-card"
                                                    beforeUpload={beforeUpload}
                                                    onChange={onUploadChange}
                                                    showUploadList={false}>
                                                    {previewImageUrl !== "" ? (
                                                        <img
                                                            src={
                                                                previewImageUrl
                                                            }
                                                            alt="preview-image"
                                                            className="img-preview-image"
                                                        />
                                                    ) : (
                                                        <div>
                                                            <PlusOutlined />
                                                            <div className="div-upload-label">
                                                                上传商品图片
                                                            </div>
                                                        </div>
                                                    )}
                                                </Upload>
                                            </Form.Item>

                                            <Form.Item
                                                name="name"
                                                label="商品名称"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "请输入商品名称"
                                                    }
                                                ]}>
                                                <Input className="in-name" />
                                            </Form.Item>

                                            <Form.Item
                                                name="description"
                                                label="商品描述"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "请输入商品描述"
                                                    }
                                                ]}>
                                                <Input.TextArea className="in-description" />
                                            </Form.Item>
                                        </Col>

                                        <Col>
                                            <Form.Item
                                                name="remaining"
                                                label="商品库存量"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "请输入商品库存量"
                                                    }
                                                ]}>
                                                <InputNumber
                                                    size="large"
                                                    min={1}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="priceYuan"
                                                className="form-item-price"
                                                label="商品价格（元，精确到分）"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "请输入商品价格"
                                                    }
                                                ]}>
                                                <InputNumber<string>
                                                    size="large"
                                                    min="0.01"
                                                    max="100000"
                                                    precision={2}
                                                    stringMode
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                validateStatus="error"
                                                help={formResult.msg}>
                                                <Space>
                                                    <Button
                                                        className="btn-management"
                                                        htmlType="submit"
                                                        block
                                                        loading={loading}>
                                                        修改商品
                                                    </Button>

                                                    <Button
                                                        className="btn-management"
                                                        type="primary"
                                                        danger
                                                        block
                                                        loading={loading}
                                                        onClick={() =>
                                                            L.deleteItem(
                                                                itemId,
                                                                setLoading,
                                                                setFormResult
                                                            )
                                                        }>
                                                        删除商品
                                                    </Button>
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        ) : (
                            <div className="empty-wrapper">
                                <Empty description="您访问的商品不存在哦" />
                            </div>
                        )}
                    </div>
                </main>

                <SiteFooter />
            </div>
        </ConfigProvider>
    );
}
