import { WITH_TLS_PROXY } from "./url-env";

let urlPrefix = "http://localhost:17570/api/";

if (WITH_TLS_PROXY) {
    urlPrefix = "http://market.yinkstudio.xyz:17750/api/";
}

const APIS = {
    // User general
    signup: "user/signup",
    login: "user/login",
    autoLogin: "user/auto_login",
    logout: "user/logout",
    changePw: "user/change_pw",

    uploadPreviewImage: "seller/upload_preview_image",
    publishItem: "seller/publish",

    getItemRecommendations: "customer/get_recommendations"
};

for (let i in APIS) {
    APIS[i] = urlPrefix + APIS[i];
}

export default APIS;
