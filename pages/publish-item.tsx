import Head from "next/head";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    ConfigProvider,
    Form,
    Input,
    InputNumber,
    Upload,
    Row,
    Col,
    Button,
    Result,
    message
} from "antd";
import NavBar from "../components/nav-bar";
import SiteBkg from "../components/site-bkg";
import SiteFooter from "../components/site-footer";
import * as L from "../logics/publish-item";
import { tryAutoLogin } from "../logics/common";
import styles from "../styles/publish-item.module.scss";
import APIS from "../modules/apis";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import CDNS, { getCdnUrl } from "../modules/cdns";
import type { FormSubmitResult } from "../modules/types";
import PageHeaderSingleText from "../components/page-header-single-text";
import { ORANGE } from "../styles/common/theme";

export default function PublishItemPage() {
    useEffect(() => {
        tryAutoLogin();
    }, []);

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");

    const [previewImageFileName, setPreviewImageFileName] = useState("");

    const [formResult, setFormResult] = useState<FormSubmitResult>({
        success: false,
        msg: ""
    });

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
                    <title>云安电子商城 - 发布商品</title>
                </Head>

                <NavBar />

                <PageHeaderSingleText headerText="发布商品" />

                <main className={styles.main}>
                    <SiteBkg />

                    <div className="div-form-wrapper">
                        {formResult.success ? (
                            <div className="result-wrapper">
                                <Result
                                    status="success"
                                    title="恭喜，您的商品发布成功！"
                                />
                            </div>
                        ) : (
                            <Form
                                name="form-publish-item"
                                form={form}
                                initialValues={{ remember: true }}
                                onValuesChange={onFormValuesChange}
                                onFinish={e =>
                                    L.publishItem(
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
                                            label="上传商品图片"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "请上传商品图片"
                                                }
                                            ]}>
                                            <Upload
                                                accept="image/jpeg,image/png,image/webp"
                                                action={APIS.uploadPreviewImage}
                                                name="previewImage"
                                                listType="picture-card"
                                                beforeUpload={beforeUpload}
                                                onChange={onUploadChange}
                                                showUploadList={false}>
                                                {previewImageUrl !== "" ? (
                                                    <img
                                                        src={previewImageUrl}
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
                                                    message: "请输入商品名称"
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
                                                    message: "请输入商品描述"
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
                                                    message: "请输入商品库存量"
                                                }
                                            ]}>
                                            <InputNumber size="large" min={1} />
                                        </Form.Item>

                                        <Form.Item
                                            name="priceYuan"
                                            className="form-item-price"
                                            label="商品价格（元，精确到分）"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "请输入商品价格"
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
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                block
                                                loading={loading}>
                                                发布商品
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </div>
                </main>

                <SiteFooter />
            </div>
        </ConfigProvider>
    );
}
