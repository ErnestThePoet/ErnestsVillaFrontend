import { observer } from "mobx-react-lite";
import type { SingleShowedItem } from "../states/item-show-data";
import CDNS, { getCdnUrl } from "../modules/cdns";
import styles from "../styles/components/single-showed-item.module.scss";
import Decimal from "decimal.js";

interface SingleShowedItemProps {
    item: SingleShowedItem;
}

export default observer(function SingleShowedItem(
    props: SingleShowedItemProps
) {
    return (
        <div className={styles.divWrapper}>
            <img
                className="preview"
                src={getCdnUrl(CDNS.images, props.item.previewImageFileName)}
                alt={props.item.name}
            />

            <div className={styles.divDetail}>
                <div className="name">{props.item.name}</div>
                <div className="price-purchase">
                    <div className="price">
                        <em>￥</em>
                        {new Decimal(props.item.priceCents).div(100).toFixed(2)}
                    </div>

                    <div className="purchase-count">
                        {props.item.purchaseCount}人付款
                    </div>
                </div>
            </div>
        </div>
    );
});
