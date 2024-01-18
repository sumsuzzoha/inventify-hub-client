import useProduct from "../../../hooks/useProduct";
import ProductCard from "../../../components/ProductCard/ProductCard";
import PropTypes from 'prop-types';


const ProductTabs = ({ cat }) => {
    const [products, , refetch] = useProduct();
    // console.log(products);
    // console.log(typeof refetch)
    const filterProducts = products.filter(item => item.category == cat);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {
                filterProducts.map((product, idx) => <ProductCard key={idx} product={product} refetch={refetch}></ProductCard>
                )
            }

        </div>
    );
};
ProductTabs.propTypes = {
    cat: PropTypes.string,
};
export default ProductTabs;