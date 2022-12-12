import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import userData from "../states/user-data";
import { message } from "antd";
import searchResultData from "../states/search-result-data";

export function submitSearch(keyword: string) {
    if (!userData.isLoggedIn) {
        Router.push("/login");
        return;
    }

    axios.get(APIS.search, {
        params: {
            accessId: userData.accessId,
            keyword
        }
    }).then(res => {
        if (res.data.success) {
            searchResultData.setResults(res.data.results);
        }
        else {
            message.error(res.data.message);
        }
    }).catch(reason => {
        console.log(reason);
        message.error(reason.message);
    });
}
