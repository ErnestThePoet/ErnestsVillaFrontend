import axios from "axios";
import APIS from "../modules/apis";
import { message } from "antd";
import userData from "../states/user-data";
import type { SingleItemDetail } from "../modules/types";

export function getItemDetail(
    itemId: number,
    setResults: React.Dispatch<
        React.SetStateAction<SingleItemDetail | undefined>
    >
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
                setResults(res.data.itemDetail);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}
