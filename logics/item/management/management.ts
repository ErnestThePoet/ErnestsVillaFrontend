import axios from "axios";
import APIS from "../../../modules/apis";
import { message } from "antd";
import userData from "../../../states/user-data";
import type {
    SingleItemDetail,
    FormSubmitResult
} from "../../../modules/types";

export function getItemDetail(
    itemId: number,
    setDetail: (detail: SingleItemDetail) => void
) {
    axios
        .get(APIS.getItemDetail, {
            params: {
                accessId: userData.accessId,
                itemId
            }
        })
        .then(res => {
            if (res.data.success) {
                setDetail(res.data.itemDetail);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}

export function updateItem(
    itemId: number,
    name: string,
    description: string,
    previewImageFileName: string,
    remaining: number,
    priceYuan: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setFormResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>
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
        .putForm(APIS.updateItem, {
            accessId: userData.accessId,
            itemId,
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

export function deleteItem(
    itemId: number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setFormResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>
) {
    setIsLoading(true);

    axios
        .delete(APIS.deleteItem, {
            params: {
                accessId: userData.accessId,
                itemId
            }
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
