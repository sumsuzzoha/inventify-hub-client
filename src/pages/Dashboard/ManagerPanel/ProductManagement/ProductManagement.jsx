import { Helmet } from "react-helmet-async";
import DataLoading from "../../../../components/Loading/DataLoading";
import useProduct from "../../../../hooks/useProduct";
import CategoryTabs from "../../CategoryTabs/CategoryTabs";

const ProductManagement = () => {
    const [products, isProductLoading] = useProduct();
    if (isProductLoading) {
        return <DataLoading></DataLoading>
    }
    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Product Management</title>
            </Helmet>
            <div className="bg-blue-500 p-4 text-white text-center md:text-left md:flex justify-between items-center rounded-lg">
                <div>
                    <h1 className="text-2xl font-semibold">Product Management</h1>
                    <p className="text-sm mt-1">Manage your products efficiently</p>
                    <p className="text-m mt-1">Total {products.length} Product Added</p>
                </div>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 focus:outline-none">
                    Add Product
                </button>
            </div>
            <div>
                <CategoryTabs></CategoryTabs>
            </div>

        </div>
    );
};

export default ProductManagement;