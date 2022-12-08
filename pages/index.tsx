import Head from "next/head";
import { useEffect } from "react";
import NavBar from "../components/nav-bar";
import { tryAutoLogin } from "../logics/common";
import styles from "../styles/index.module.scss";

export default function HomePage() {
    useEffect(() => {
        tryAutoLogin();
    }, []);

    return (
        <div>
            <Head>
                <title>云安电子商城</title>
            </Head>

            <NavBar/>
        </div>
    );
}
