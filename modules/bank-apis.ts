import { WITH_TLS_PROXY } from "./url-env.mjs";

let bank1UrlPrefix = "http://bank1.yinkstudio.xyz:17570/api/";
let bank2UrlPrefix = "http://bank2.yinkstudio.xyz:17570/api/";

if (WITH_TLS_PROXY) {
    bank1UrlPrefix = "http://bank1.yinkstudio.xyz/api/";
    bank2UrlPrefix = "http://bank2.yinkstudio.xyz/api/";
}

const BANK_APIS = {
    login: "login",
    auth: "auth",
    pay: "pay"
};

const BANK1_APIS = { ...BANK_APIS };
const BANK2_APIS = { ...BANK_APIS };

for (const i in BANK_APIS) {
    BANK1_APIS[i] = bank1UrlPrefix + BANK_APIS[i];
    BANK2_APIS[i] = bank2UrlPrefix + BANK_APIS[i];
}

export { BANK1_APIS, BANK2_APIS };
