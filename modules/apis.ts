const WITH_TLS_PROXY: boolean = false;

let urlPrefix = "http://localhost:17565/api/";

if (WITH_TLS_PROXY) {
    urlPrefix = "http://market.yinkstudio.xyz:17650/api/";
}

const APIS = {
    // User general
    signup: "user/signup",
    login: "user/login",
    autoLogin: "user/auto_login",
    logout: "user/logout",
    changePw: "user/change_pw"
};

for (let i in APIS) {
    APIS[i] = urlPrefix + APIS[i];
}

export default APIS;
