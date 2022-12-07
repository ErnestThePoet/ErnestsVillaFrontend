import type { AppProps } from "next/app";
import { ConfigProvider,message } from "antd";
// this reset default styles of various elements, including body
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
    const [_, contextHolder] = message.useMessage();

    return (
        <ConfigProvider theme={{ token: { colorPrimary: "F05355" } }}>
            {contextHolder}
            <Component {...pageProps} />
        </ConfigProvider>
    );
}
