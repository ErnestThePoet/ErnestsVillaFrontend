import { useRouter } from "next/router";
import styles from "../styles/components/success-page-header.module.scss";

interface PageHeaderSingleTextProps {
    headerText: string;
}

export default function PageHeaderSingleText(props: PageHeaderSingleTextProps) {
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
                <span className="welcome">{props.headerText}</span>
            </div>
        </header>
    );
}
