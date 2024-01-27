import { Helmet } from "react-helmet-async";
import useShopUserWise from "../../../../hooks/useShopUserWise";
import ShopDetailsPage from "../../../../components/ShopDetailsPage/ShopDetailsPage";

const ManageShop = () => {
    const [shop] = useShopUserWise();
    // console.log(shop);
    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Manage Shop</title>
            </Helmet>
            <div>
                <ShopDetailsPage shopDetail={shop}></ShopDetailsPage>
            </div>

        </div>
    );
};

export default ManageShop;