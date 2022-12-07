import axios from "axios";
import Router from "next/router";
import APIS from "../../modules/apis";
import userData from "../../states/user-data";
import { message } from "antd";
import changePwDialogState from "../../states/change-pw-dialog-state";

export const logout = () => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId !== null && sessionId.length > 25) {
        axios.postForm(APIS.logout, { sessionId });
    }

    localStorage.removeItem("sessionId");

    userData.clearUserData();

    Router.push("/");
};

export const changePw = () => {
    if (changePwDialogState.newPw !== changePwDialogState.newPwConfirm) {
        return;
    }

    if (changePwDialogState.oldPw === changePwDialogState.newPw) {
        changePwDialogState.setResultMsg("新密码和旧密码不能相同");
        return;
    }

    changePwDialogState.setIsConfirmLoading(true);

    axios
        .postForm(APIS.changePw, {
            account: userData.account,
            password: changePwDialogState.oldPw,
            newPassword: changePwDialogState.newPw
        })
        .then(res => {
            if (res.data.success) {
                message.success("修改密码成功，请重新登陆");
                changePwDialogState.setIsOpen(false);
                changePwDialogState.setResultMsg("");
                logout();
            } else {
                changePwDialogState.setResultMsg(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        })
        .finally(() => {
            changePwDialogState.setIsConfirmLoading(false);
        });
};
