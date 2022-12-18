import axios from "axios";
import APIS from "../modules/apis";
import { message } from "antd";
import userData from "../states/user-data";
import { SetStateFn } from "../modules/fn-types";
import { SinglePurchasedItemDetail } from "../modules/types";

export function fetchPurchases(
    setDetails: SetStateFn<SinglePurchasedItemDetail[]>
) {
    axios
        .get(APIS.getPurchases, {
            params: {
                accessId: userData.accessId
            }
        })
        .then(res => {
            if (res.data.success) {
                setDetails(res.data.purchasedItemDetails);
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}
