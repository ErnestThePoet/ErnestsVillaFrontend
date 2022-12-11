import styles from "../styles/components/page-header-single-text.module.scss";
import Logo from "./logo";

interface PageHeaderSingleTextProps {
    headerText: string;
}

export default function PageHeaderSingleText(props: PageHeaderSingleTextProps) {
    return (
        <header className={styles.header}>
            <div>
                <Logo className={styles.logo} />
                <span className="welcome">{props.headerText}</span>
            </div>
        </header>
    );
}
