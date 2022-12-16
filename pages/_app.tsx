import type { AppProps } from "next/app";
import { ConfigProvider, message } from "antd";
// this reset default styles of various elements, including body
import "antd/dist/reset.css";
import "../styles/common/common.css";
import GlobalComponentHolder from "../components/global-component-holder";
import { RED } from "../styles/common/theme";

export default function App({ Component, pageProps }: AppProps) {
    const [_, contextHolder] = message.useMessage();

    return (
        <ConfigProvider theme={{ token: { colorPrimary: RED } }}>
            {contextHolder}
            <GlobalComponentHolder />
            <Component {...pageProps} />
        </ConfigProvider>
    );
}
