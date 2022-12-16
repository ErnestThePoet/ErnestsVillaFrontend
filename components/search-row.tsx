import { observer } from "mobx-react-lite";
import { Button, Badge, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Logo from "../components/logo";
import styles from "../styles/components/search-row.module.scss";
import searchData from "../states/search-data";
import { useRouter } from "next/router";
import shoppingCartData from "../states/shopping-cart-data";
import userData from "../states/user-data";

const { Search } = Input;

export default observer(function SearchRow() {
    const router = useRouter();

    return (
        <div className={styles.divSearchRow}>
            <Logo size={60} />

            <Search
                placeholder="输入要搜索的宝贝名称"
                allowClear
                enterButton="搜索"
                size="large"
                value={searchData.searchKeyWord}
                onChange={e => searchData.setSearchKeyWord(e.target.value)}
                onSearch={e => {
                    if (e !== "") {
                        if (userData.isLoggedIn) {
                            router.push("/search/" + e);
                        } else {
                            router.push("/login");
                        }
                    }
                }}
            />

            <Badge count={shoppingCartData.cartItems.length}>
                <Button
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    onClick={() => shoppingCartData.setIsDrawerOpen(true)}>
                    我的购物车
                </Button>
            </Badge>
        </div>
    );
});
