import styles from "../styles/login-header.module.scss";

export default function LoginHeader() {
    return (
        <header className={styles.header}>
            <div>
                <img className="logo" src="/logo.png" alt="logo" />
                <span className="welcome">欢迎登录</span>
            </div>
        </header>
    );
}
