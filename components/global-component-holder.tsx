import ChangePwDialog from "./dialogs/change-pw-dialog";
import ShoppingCartDrawer from "./shopping-cart-drawer";

export default function GlobalComponentHolder() {
    return (
        <>
            <ChangePwDialog />
            <ShoppingCartDrawer />
        </>
    );
}
