import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import userData from "../states/user-data";
import { message } from "antd";
import type { FormSubmitResult } from "../modules/types";

export function publishItem(
    name: string,
    description: string,
    previewImageFileName: string,
    remaining: number,
    priceCents: number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setLoginResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>
) {
    if (previewImageFileName === "") {
        setLoginResult({
            success: false,
            msg: "请上传商品图片"
        });

        return;
    }

    setIsLoading(true);

    axios
        .postForm(APIS.publishItem, {
            accessId: userData.accessId,
            name,
            description,
            previewImageFileName,
            remaining,
            priceCents
        })
        .then(res => {
            if (res.data.success) {
                setLoginResult({
                    success: true,
                    msg: ""
                });

                Router.push("/publish-success");
            } else {
                setLoginResult({
                    success: false,
                    msg: res.data.msg
                });
            }
        })
        .catch(reason => {
            message.error(reason.message);
            console.log(reason);
        })
        .finally(() => setIsLoading(false));
}
