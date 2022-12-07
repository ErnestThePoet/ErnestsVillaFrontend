import { useRouter } from "next/router";
import styles from "../styles/login-header.module.scss";

export default function LoginHeader() {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <div>
                <img
                    className="logo"
                    src="/logo.png"
                    alt="logo"
                    onClick={() => router.push("/")}
                />
                <span className="welcome">欢迎登录</span>
            </div>
        </header>
    );
}
