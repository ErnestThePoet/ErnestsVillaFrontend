import { Divider } from "antd";
import Link from "next/link";
import styles from "./styles/nav-bar.module.scss";

export default function NavBar() {
    return (
        <header className={styles.header}>
            <span className="href-no-hover">
                你好，
                <Link className="login" href="/login">
                    请登录
                </Link>
            </span>

            <Divider className="divider" type="vertical" />

            <span className="href">免费注册</span>

            <Divider className="divider" type="vertical" />

            <span className="href">我的订单</span>

            <Divider className="divider" type="vertical" />

            <span className="href">购物车</span>
        </header>
    );
}