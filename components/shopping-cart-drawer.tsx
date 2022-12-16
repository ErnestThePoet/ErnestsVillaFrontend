import { observer } from "mobx-react-lite";
import { Button, Drawer, Space, Empty } from "antd";
import shoppingCartData from "../states/shopping-cart-data";
import SingleCartItem from "./single-cart-item";
import styles from "../styles/components/shopping-cart-drawer.module.scss";

export default observer(function ShoppingCartDrawer() {
    return (
        <Drawer
            title={`我的购物车(${shoppingCartData.cartItems.length})`}
            extra={
                <Space size={20}>
                    <div className={styles.divTotalPrice}>
                        <span className="total-price-label">总计：</span>

                        <span className="total-price-value">
                            <em>￥</em>
                            {shoppingCartData.totalPriceYuan}
                        </span>
                    </div>

                    <Button type="primary">结算</Button>
                </Space>
            }
            placement="right"
            width={450}
            closable={false}
            onClose={() => shoppingCartData.setIsDrawerOpen(false)}
            open={shoppingCartData.isDrawerOpen}>
            {shoppingCartData.cartItems.length > 0 ? (
                <Space direction="vertical" size={20}>
                    {shoppingCartData.cartItems.map((x, i) => (
                        <SingleCartItem
                            key={i}
                            purchaseWish={x}
                            totalPriceYuan={shoppingCartData.getItemTotalPriceYuan(
                                i
                            )}
                            onCountChange={e =>
                                shoppingCartData.changeCount(i, e)
                            }
                            onDeleteClick={() => shoppingCartData.deleteItem(i)}
                        />
                    ))}
                </Space>
            ) : (
                <div className={styles.divEmptyWrapper}>
                    <Empty description="购物车空空如也" />
                </div>
            )}
        </Drawer>
    );
});
