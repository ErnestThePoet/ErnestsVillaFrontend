import { message } from "antd";
import axios from "axios";
import Router from "next/router";
import APIS from "../../modules/apis";
import shoppingCartData from "../../states/shopping-cart-data";
import userData from "../../states/user-data";

export function deleteFromCart(index: number) {
    const id = shoppingCartData.cartItems[index].id;
    shoppingCartData.deleteItem(index);

    axios
        .delete(APIS.deleteFromCart, {
            params: {
                accessId: userData.accessId,
                id
            }
        })
        .then(res => {
            if (!res.data.success) {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}

export function updateCartItemCount(index: number, count: number) {
    shoppingCartData.changeCount(index, count);

    axios
        .putForm(APIS.updateCartItemCount, {
            accessId: userData.accessId,
            id: shoppingCartData.cartItems[index].id,
            count
        })
        .then(res => {
            if (!res.data.success) {
                message.error(res.data.msg);
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);
        });
}
