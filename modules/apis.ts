// js modules have to be imported with explicit suffix
import { WITH_TLS_PROXY } from "./url-env.mjs";

let urlPrefix = "http://localhost:17570/api/";

if (WITH_TLS_PROXY) {
    urlPrefix = "http://market.yinkstudio.xyz/api/";
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
    updateItem: "seller/update",
    deleteItem: "seller/delete",

    getItemRecommendations: "customer/get_recommendations",
    search: "customer/search",
    getItemDetail: "customer/get_item_detail"
};

for (const i in APIS) {
    APIS[i] = urlPrefix + APIS[i];
}

export default APIS;
