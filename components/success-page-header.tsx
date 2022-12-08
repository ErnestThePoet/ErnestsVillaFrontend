import { useRouter } from "next/router";
import styles from "../styles/components/success-page-header.module.scss";

interface SuccessPageHeaderProps {
    headerText: string;
}

export default function SuccessPageHeader(props: SuccessPageHeaderProps) {
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
