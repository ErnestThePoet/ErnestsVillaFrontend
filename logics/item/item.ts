import axios from "axios";
import APIS from "../../modules/apis";
import { message } from "antd";
import userData from "../../states/user-data";
import type { SingleItemDetail } from "../../modules/types";
import shoppingCartData from "../../states/shopping-cart-data";
import type { SetStateFn } from "../../modules/fn-types";
import createOrderData from "../../states/create-order-data";
import Router from "next/router";

export function getItemDetail(
    itemId: number,
    setDetail: SetStateFn<SingleItemDetail | undefined>
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

    axios
        .postForm(APIS.addToCart, {
            accessId: userData.accessId,
            itemId: detail.itemId,
            count
        })
        .then(res => {
            if (res.data.success) {
                shoppingCartData.addCartItem({
                    id: res.data.id,
                    item: detail,
                    count
                });
                message.success("添加成功，在购物车等亲~");
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}

export function buyNow(item: SingleItemDetail, count: number) {
    createOrderData.setItems([
        {
            id: -1,
            item,
            count
        }
    ]);
    Router.push("/create-order");
}
