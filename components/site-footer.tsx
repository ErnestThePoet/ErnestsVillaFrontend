import { Divider } from "antd";
import styles from "../styles/components/site-footer.module.scss";

export default function SiteFooter() {
    return (
        <footer className={styles.footer}>
            <div className="footer-wrapper">
                <div className="links-wrapper">
                    <a onClick={() => {}}>关于我们</a>

                    <Divider className="divider" type="vertical" />

                    <a href="http://ca.yinkstudio.xyz">Yink&apos;s CA</a>

                    <Divider className="divider" type="vertical" />

                    <a href="http://bank1.yinkstudio.xyz">YYH Bank</a>

                    <Divider className="divider" type="vertical" />

                    <a href="http://bank2.yinkstudio.xyz">HIT Bank</a>

                    <Divider className="divider" type="vertical" />

                    <a href="https://github.com/ErnestThePoet/TLS-Proxy">
                        TLS Proxy
                    </a>
                </div>
                <div className="info-wrapper">Copyright © 2022 Ernest Cui</div>
            </div>
        </footer>
    );
}
