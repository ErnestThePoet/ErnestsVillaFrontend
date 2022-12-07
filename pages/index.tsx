import Head from "next/head";
import NavBar from "../components/nav-bar";
import styles from "../styles/index.module.scss";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>云安电子商城</title>
            </Head>

            <NavBar/>
        </div>
    );
}
