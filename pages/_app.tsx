import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
// this reset default styles of various elements, including body
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: "F05355" } }}>
            <Component {...pageProps} />
        </ConfigProvider>
    );
}
