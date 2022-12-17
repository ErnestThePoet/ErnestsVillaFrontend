import { Button } from "antd";
import CDNS, { getCdnUrl } from "../modules/cdns";
import shoppingCartData from "../states/shopping-cart-data";
import styles from "../styles/components/single-cart-item.module.scss";
import ItemNumberInput from "./item-number-input";

interface SingleCartItemProps {
    index: number;
    onCountChange: (e: number) => void;
    onDeleteClick: () => void;
}

export default function SingleCartItem(props: SingleCartItemProps) {
    const purchaseWish = shoppingCartData.cartItems[props.index];

    return (
        <div className={styles.divItemWrapper}>
            <img
                className="preview"
                src={getCdnUrl(
                    CDNS.images,
                    purchaseWish.item.previewImageFileName
                )}
                alt="preview"
            />

            <div className={styles.divDetail}>
                <div className="name">{purchaseWish.item.name}</div>

                <div className="price">
                    <span className="price-label">单件价格：</span>
                    <span className="price-value">
                        ￥{purchaseWish.item.priceYuan}
                    </span>
                </div>

                <ItemNumberInput
                    className="count"
                    value={purchaseWish.count}
                    onChange={e => props.onCountChange(e as number)}
                    min={1}
                    max={purchaseWish.item.remaining}
                />

                <div className="bottom">
                    <div className="total-price">
                        <span className="total-price-label">总价：</span>
                        <span className="total-price-value">
                            ￥{shoppingCartData.getItemTotalPriceYuan(props.index)}
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
