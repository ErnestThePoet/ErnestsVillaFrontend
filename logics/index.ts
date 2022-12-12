import axios from "axios";
import Router from "next/router";
import APIS from "../modules/apis";
import userData from "../states/user-data";
import { message } from "antd";
import itemRecommendationData from "../states/item-recommendation-data";

export function fetchRecommendedItems() {
    axios
        .get(APIS.getItemRecommendations, {
            params: {
                count: 16
            }
        })
        .then(res => {
            if (res.data.success) {
                itemRecommendationData.setRecommendations(res.data.recommendations);
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}
