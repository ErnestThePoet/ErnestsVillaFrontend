import Decimal from "decimal.js";
import type { SingleItemPurchaseWish } from "./types";

export function getItemTotalPriceYuan(item: SingleItemPurchaseWish): string {
    return new Decimal(item.item.priceYuan).mul(item.count).toFixed(2);
}

export function getTotalPriceYuan(items: SingleItemPurchaseWish[]): string {
    return items
        .reduce((p, x) => p.add(getItemTotalPriceYuan(x)), new Decimal(0))
        .toFixed(2);
}
