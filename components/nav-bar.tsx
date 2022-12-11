import { Divider, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import userData from "../states/user-data";
import * as L from "../logics/components/nav-bar";
import styles from "../styles/components/nav-bar.module.scss";
import changePwDialogState from "../states/change-pw-dialog-state";

const userMenuItems: MenuProps["items"] = [
    {
        key: "0",
        label: "修改密码",
        onClick: () => changePwDialogState.setIsOpen(true)
    },
    {
        key: "1",
        label: "退出登录",
        danger: true,
        onClick: () => L.logout()
    }
];

export default observer(function NavBar() {
    return (
        <nav className={styles.nav}>
            {userData.isLoggedIn ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottom">
                    <span className="welcome">
                        Hi,&nbsp;
                        <b className="user">{userData.account}</b>
                    </span>
                </Dropdown>
            ) : (
                <>
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
                </>
            )}

            <Divider className="divider" type="vertical" />

            <Link className="href" href="/publish-item">
                发布商品
            </Link>

            <Divider className="divider" type="vertical" />

            <span className="href">我的订单</span>
        </nav>
    );
});
