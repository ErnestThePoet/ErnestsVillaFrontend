import { observer } from "mobx-react-lite";
import type { SingleItemPreview } from "../modules/types";
import CDNS, { getCdnUrl } from "../modules/cdns";
import styles from "../styles/components/single-search-result.module.scss";
import Decimal from "decimal.js";
import { useRouter } from "next/router";
import userData from "../states/user-data";

interface SingleSearchResultProps {
    item: SingleItemPreview;
}

export default observer(function SingleSearchResult(
    props: SingleSearchResultProps
) {
    const router = useRouter();

    return (
        <div
            className={styles.divWrapper}
            onClick={() => {
                if (userData.isLoggedIn) {
                    router.push(`/item/${props.item.itemId}`);
                } else {
                    router.push("/login");
                }
            }}>
            <img
                className="preview"
                src={getCdnUrl(CDNS.images, props.item.previewImageFileName)}
                alt={props.item.name}
            />

            <div className={styles.divDetail}>
                <div className="price-purchase">
                    <div className="price">
                        <em>￥</em>
                        {new Decimal(props.item.priceCents).div(100).toFixed(2)}
                    </div>

                    <div className="purchase-count">
                        {props.item.purchaseCount}人付款
                    </div>
                </div>
                <div className="name">{props.item.name}</div>
            </div>
        </div>
    );
});
