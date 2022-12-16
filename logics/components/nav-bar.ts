import axios from "axios";
import Router from "next/router";
import APIS from "../../modules/apis";
import userData from "../../states/user-data";
import { message } from "antd";
import changePwDialogState from "../../states/change-pw-dialog-state";

export const logout = () => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId !== null && sessionId.length > 25) {
        axios.putForm(APIS.logout, { sessionId });
    }

    localStorage.removeItem("sessionId");

    userData.clearUserData();

    Router.push("/");
};
