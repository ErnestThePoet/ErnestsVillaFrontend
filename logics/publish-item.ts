import axios from "axios";
import APIS from "../modules/apis";
import userData from "../states/user-data";
import { message } from "antd";
import type {
    SetFormSubmitResultFn,
    SetLoadingFn
} from "../modules/fn-types";

export function publishItem(
    name: string,
    description: string,
    previewImageFileName: string,
    remaining: number,
    priceYuan: string,
    setIsLoading: SetLoadingFn,
    setFormResult: SetFormSubmitResultFn
) {
    if (previewImageFileName === "") {
        setFormResult({
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
            priceYuan
        })
        .then(res => {
            if (res.data.success) {
                setFormResult({
                    success: true,
                    msg: ""
                });
            } else {
                setFormResult({
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
