import { useRouter } from "next/router";
import classNames from "classnames";
import styles from "../styles/components/logo.module.scss";

interface LogoProps {
    className?: string;
    size?: number;
}

export default function Logo(props: LogoProps) {
    const router = useRouter();

    return (
        <img
            className={classNames(styles.imgLogo, props.className)}
            style={{
                height: props.size ?? 70
            }}
            src="/logo.png"
            alt="logo"
            onClick={() => router.push("/")}
        />
    );
}
