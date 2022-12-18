// js modules have to be imported with explicit suffix
import { WITH_TLS_PROXY } from "./url-env.mjs";

let urlPrefix = "http://localhost:17570/api/";

if (WITH_TLS_PROXY) {
    urlPrefix = "http://market.yinkstudio.xyz/api/";
}

const APIS = {
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
    getItemDetail: "customer/get_item_detail",

    getCartItems: "customer/get_cart_items",
    addToCart: "customer/add_to_cart",
    deleteFromCart: "customer/delete_from_cart",
    updateCartItemCount: "customer/update_cart_item_count",
    clearUserCart: "customer/clear_user_cart",

    getUnpaidPurchase: "customer/get_unpaid_purchase",
    createOrder: "customer/create_order",
    cancelOrder: "customer/cancel_order",
    confirmOrder: "customer/confirm_order",

    getPurchases: "customer/get_purchases"
};

for (const i in APIS) {
    APIS[i] = urlPrefix + APIS[i];
}

export default APIS;
