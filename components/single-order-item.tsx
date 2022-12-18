import { useRouter } from "next/router";
import CDNS, { getCdnUrl } from "../modules/cdns";
import type { SingleItemDetail } from "../modules/types";
import styles from "../styles/components/single-order-item.module.scss";

interface SingleOrderItemProps {
    item: SingleItemDetail;
}

export default function SingleOrderItem(props: SingleOrderItemProps) {
    const router = useRouter();

    return (
        <div className={styles.divWrapper}>
            <img
                className="preview"
                src={getCdnUrl(CDNS.images, props.item.previewImageFileName)}
                alt="preview"
                onClick={() => router.push("/item/" + props.item.itemId)}
            />

            <div className="brief">
                <div
                    className="name"
                    onClick={() => router.push("/item/" + props.item.itemId)}>
                    {props.item.name}
                </div>

                <div className="seller">{props.item.sellerAccount}</div>
            </div>
        </div>
    );
}
