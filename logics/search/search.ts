import axios from "axios";
import APIS from "../../modules/apis";
import userData from "../../states/user-data";
import { message } from "antd";
import type {
    SetFormSubmitResultFn
} from "../../modules/fn-types";

export function submitSearch(
    keyword: string,
    setResults: SetFormSubmitResultFn
) {
    axios
        .get(APIS.search, {
            params: {
                accessId: userData.accessId,
                keyword
            }
        })
        .then(res => {
            if (res.data.success) {
                setResults(res.data.results);
            } else {
                message.error(res.data.message);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}
