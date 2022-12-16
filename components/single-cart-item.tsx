import { Button } from "antd";
import CDNS, { getCdnUrl } from "../modules/cdns";
import type { SingleItemPurchaseWish } from "../modules/types";
import styles from "../styles/components/single-cart-item.module.scss";
import ItemNumberInput from "./item-number-input";

interface SingleCartItemProps {
    purchaseWish: SingleItemPurchaseWish;
    totalPriceYuan: string;
    onCountChange: (e: number) => void;
    onDeleteClick: () => void;
}

export default function SingleCartItem(props: SingleCartItemProps) {
    return (
        <div className={styles.divItemWrapper}>
            <img
                className="preview"
                src={getCdnUrl(
                    CDNS.images,
                    props.purchaseWish.item.previewImageFileName
                )}
                alt="preview"
            />

            <div className={styles.divDetail}>
                <div className="name">{props.purchaseWish.item.name}</div>

                <div className="price">
                    <span className="price-label">单件价格：</span>
                    <span className="price-value">
                        ￥{props.purchaseWish.item.priceYuan}
                    </span>
                </div>

                <ItemNumberInput
                    className="count"
                    value={props.purchaseWish.count}
                    onChange={e => props.onCountChange(e as number)}
                    min={1}
                    max={props.purchaseWish.item.remaining}
                />

                <div className="bottom">
                    <div className="total-price">
                        <span className="total-price-label">总价：</span>
                        <span className="total-price-value">
                            ￥{props.totalPriceYuan}
                        </span>
                    </div>

                    <Button
                        className="delete"
                        type="link"
                        danger
                        onClick={props.onDeleteClick}>
                        删除
                    </Button>
                </div>
            </div>
        </div>
    );
}
