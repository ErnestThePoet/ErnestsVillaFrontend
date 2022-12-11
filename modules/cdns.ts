import { WITH_TLS_PROXY } from "./url-env";

let cdnBase = "http://localhost:17570/cdn/";

if (WITH_TLS_PROXY) {
    cdnBase = "http://market.yinkstudio.xyz:17750/cdn/";
}

const CDNS = {
    images: "images/"
};

for (let i in CDNS) {
    CDNS[i] = cdnBase + CDNS[i];
}

export default CDNS;

export function getCdnUrl(cdnPath: string, fileName: string): string{
    return cdnPath + fileName;
}
