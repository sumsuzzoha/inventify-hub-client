import { useLocation } from "react-router-dom";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import useProductShopWise from "../../../../hooks/useProductShopWise";

const ShopsProduct = () => {
    const location = useLocation();
    const [products=[], , refetch] = useProductShopWise(location.state);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {products.map(product => <ProductCard key={product._id} product={product} refetch={refetch}></ProductCard>)}

        </div>
    );
};

export default ShopsProduct;