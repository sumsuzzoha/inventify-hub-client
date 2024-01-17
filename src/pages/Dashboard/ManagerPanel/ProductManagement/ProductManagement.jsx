import DataLoading from "../../../../components/Loading/DataLoading";
import useProduct from "../../../../hooks/useProduct";
import ProductCard from "./ProductCard";

const ProductManagement = () => {
    const [products, isProductLoading] = useProduct();
    if (isProductLoading) {
        return <DataLoading></DataLoading>
    }
    return (
        <div>
            <div className="bg-blue-500 p-4 text-white text-center md:text-left md:flex justify-between items-center rounded-lg">
                <div>
                    <h1 className="text-2xl font-semibold">Product Management</h1>
                    <p className="text-sm mt-1">Manage your products efficiently</p>
                    <p className="text-m mt-1">Total 6 Product Added</p>
                </div>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 focus:outline-none">
                    Add Product
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                {products.map(product =>
                    <ProductCard product={product} key={product._id}></ProductCard>
                )}
            </div>

        </div>
    );
};

export default ProductManagement;