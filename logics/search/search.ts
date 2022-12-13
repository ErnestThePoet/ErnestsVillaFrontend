import axios from "axios";
import APIS from "../../modules/apis";
import userData from "../../states/user-data";
import { message } from "antd";
import type { SingleItemPreview } from "../../modules/types";

export function submitSearch(
    keyword: string,
    setResults: React.Dispatch<React.SetStateAction<SingleItemPreview[]>>
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
