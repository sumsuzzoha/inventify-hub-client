import useProduct from "../../../hooks/useProduct";
import ProductCard from "../../../components/ProductCard/ProductCard";
import PropTypes from 'prop-types';


const ProductTabs = ({ cat }) => {
    const [products,] = useProduct();
    const filterProducts = products.filter(item => item.category == cat);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {
                filterProducts.map((product, idx) => <ProductCard key={idx} product={product}></ProductCard>)
            }

        </div>
    );
};
ProductTabs.propTypes = {
    cat: PropTypes.object,
};
export default ProductTabs;