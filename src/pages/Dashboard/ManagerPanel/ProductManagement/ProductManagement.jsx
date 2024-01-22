import { Helmet } from "react-helmet-async";
import DataLoading from "../../../../components/Loading/DataLoading";
import useProductShopWise from "../../../../hooks/useProductShopWise";
import CategoryTabs from "../../CategoryTabs/CategoryTabs";
import DashPageHeader from "../../../../components/DashPageHeader/DashPageHeader";

const ProductManagement = () => {
    const [products, isProductLoading] = useProductShopWise();
    if (isProductLoading) {
        return <DataLoading></DataLoading>
    }
    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Product Management</title>
            </Helmet>
            <DashPageHeader
                title={"Product Management"}
                subTitle={"Product sdded in Shop"}
                description={'Add your products efficiently'}
                data={products}
                dynamicLink={'/dashboard/addProduct'}
                link_Btn_Title={'Add a Product'}
            // icon={<FaShoppingCart />}
            // items={cartItems}
            // func={handleGenarateInvoice}
            ></DashPageHeader>
            <div>
                <CategoryTabs></CategoryTabs>
            </div>

        </div>
    );
};

export default ProductManagement;