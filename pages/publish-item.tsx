import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload } from "antd";
import NavBar from "../components/nav-bar";
import SiteBkg from "../components/site-bkg";
import SiteFooter from "../components/site-footer";
import * as L from "../logics/publish-item";
import { tryAutoLogin } from "../logics/common";
import styles from "../styles/publish-item.module.scss";
import APIS from "../modules/apis";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import CDNS from "../modules/cdns";

export default function PublishItemPage() {
    useEffect(() => {
        tryAutoLogin();
    }, []);

    const [loading, setLoading] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState("");

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
                CDNS.images + info.file.response.previewImageFileName
            );
        }
    };

    return (
        <div>
            <NavBar />

            <main className={styles.main}>
                <SiteBkg />

                <div className="div-form-wrapper">
                    <Form
                        name="form-publish-item"
                        initialValues={{ remember: true }}
                        onFinish={() => L.publishItem()}>
                        <Form.Item>
                            <Upload
                                accept="image/jpeg,image/png"
                                action={APIS.uploadPreviewImage}
                                name="previewImage"
                                listType="picture-card"
                                onChange={onUploadChange}
                                showUploadList={false}>
                                {previewImageUrl !== "" ? (
                                    <img
                                        src={previewImageUrl}
                                        alt="avatar"
                                        style={{ width: "100%" }}
                                    />
                                ) : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>
                                            上传商品图片
                                        </div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
