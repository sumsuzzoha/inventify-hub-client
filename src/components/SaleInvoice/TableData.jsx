import PropTypes from 'prop-types';

const TableData = ({product}) => {
    // console.log(product);
    const formatedtotalPriceWhDisc = (product.totalPriceWhDisc).toFixed(2);
    return (
        <tr  className='text-center'>
            <td className="border p-2">{product?.name}</td>
            <td className="border p-2">{product?.saleQuantity}</td>
            <td className="border p-2">{product?.sellingPrice}</td>
            <td className="border p-2">{product?.discount}</td>
            <td className="border py-2 pr-6 text-end">{formatedtotalPriceWhDisc}</td>
        </tr>
    );
};
TableData.propTypes = {
    product: PropTypes.object
  };
  
export default TableData;