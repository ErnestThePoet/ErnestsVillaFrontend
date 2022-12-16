import axios from "axios";
import APIS from "../../modules/apis";
import { message } from "antd";
import userData from "../../states/user-data";
import type { SingleItemDetail } from "../../modules/types";
import shoppingCartData from "../../states/shopping-cart-data";

export function getItemDetail(
    itemId: number,
    setDetail: React.Dispatch<
        React.SetStateAction<SingleItemDetail | undefined>
    >
) {
    axios
        .get(APIS.getItemDetail, {
            params: {
                accessId: userData.accessId,
                itemId
            }
        })
        .then(res => {
            if (res.data.success) {
                setDetail(res.data.itemDetail);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}

export function addToCart(detail: SingleItemDetail, count: number) {
    if (shoppingCartData.doesItemExist(detail.itemId)) {
        message.info("购物车中已经有该商品了哦");
        return;
    }

    shoppingCartData.addCartItem({
        item: detail,
        count
    });

    message.success("添加成功，在购物车等亲~");
}