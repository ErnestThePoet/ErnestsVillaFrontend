import { Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles/nav-bar.module.scss";

export default function NavBar() {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <span className="href-no-hover">
                你好，
                <Link className="login" href="/login">
                    请登录
                </Link>
            </span>

            <Divider className="divider" type="vertical" />

            <Link className="href" href="/login?signup=1">
                免费注册
            </Link>

            <Divider className="divider" type="vertical" />

            <span className="href">我的订单</span>

            <Divider className="divider" type="vertical" />

            <span className="href">购物车</span>
        </header>
    );
}
