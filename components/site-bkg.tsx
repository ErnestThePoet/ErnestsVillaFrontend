import styles from "../styles/components/site-bkg.module.scss";

export default function SiteBkg() {
    return (
        <img className={styles.imgBkg}
            alt="background"
            src="/bkg.png" />
    )
}