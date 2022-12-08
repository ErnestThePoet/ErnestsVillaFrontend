import axios from "axios";
import APIS from "../modules/apis";
import userData from "../states/user-data";

export const tryAutoLogin = (onLogin?:()=>void) => {
    if (userData.isLoggedIn) {
        return;
    }

    const sessionId = localStorage.getItem("sessionId");

    if (sessionId !== null && sessionId.length > 25) {
        axios.postForm(APIS.autoLogin, { sessionId }).then(res => {
            if (res.data.success) {
                userData.setLoginUserData(res.data.account, res.data.accessId);
                if (onLogin !== undefined) {
                    onLogin();
                }
            }
        });
    }
};
