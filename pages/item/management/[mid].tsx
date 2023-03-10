import Head from "next/head";
import { useEffect, useState } from "react";
import { PlusOutlined, ExclamationCircleFilled } from "@ant-design/icons";
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
    Modal,
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

const { confirm } = Modal;

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
            message.error("????????????????????????1M");
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
                    <title>?????????????????? - ????????????</title>
                </Head>

                <NavBar />

                <PageHeaderSingleText headerText="????????????" />

                <main className={styles.main}>
                    <SiteBkg />

                    <div className="div-form-wrapper">
                        {isDetailFetched ? (
                            formResult.success ? (
                                <div className="result-wrapper">
                                    <Result status="success" title="????????????" />
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
                                                label="??????????????????">
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
                                                                ??????????????????
                                                            </div>
                                                        </div>
                                                    )}
                                                </Upload>
                                            </Form.Item>

                                            <Form.Item
                                                name="name"
                                                label="????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "?????????????????????"
                                                    }
                                                ]}>
                                                <Input className="in-name" />
                                            </Form.Item>

                                            <Form.Item
                                                name="description"
                                                label="????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "?????????????????????"
                                                    }
                                                ]}>
                                                <Input.TextArea className="in-description" />
                                            </Form.Item>
                                        </Col>

                                        <Col>
                                            <Form.Item
                                                name="remaining"
                                                label="???????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "????????????????????????"
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
                                                label="????????????????????????????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "?????????????????????"
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
                                                        ????????????
                                                    </Button>

                                                    <Button
                                                        className="btn-management"
                                                        type="primary"
                                                        danger
                                                        block
                                                        loading={loading}
                                                        onClick={() =>
                                                            confirm({
                                                                title: "????????????",
                                                                icon: (
                                                                    <ExclamationCircleFilled />
                                                                ),
                                                                content:
                                                                    "????????????????????????",
                                                                okText: "????????????",
                                                                cancelText:
                                                                    "??????",
                                                                onOk: () =>
                                                                    L.deleteItem(
                                                                        itemId,
                                                                        setLoading,
                                                                        setFormResult
                                                                    )
                                                            })
                                                        }>
                                                        ????????????
                                                    </Button>
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        ) : (
                            <div className="empty-wrapper">
                                <Empty description="??????????????????????????????" />
                            </div>
                        )}
                    </div>
                </main>

                <SiteFooter />
            </div>
        </ConfigProvider>
    );
}
