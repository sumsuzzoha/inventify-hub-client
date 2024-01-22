import PropTypes from 'prop-types';

const SaleTable = ({ item, idx }) => {
    const datePart = item?.invoiceDate ? item.invoiceDate.split(', ')[0] : '';
    const profit = item?.totalPriceWhDisc && item?.buyingPriceWhVat
        ? parseInt(item.totalPriceWhDisc) - parseInt(item.buyingPriceWhVat)
        : 0;

    const formattedProfit = parseFloat(profit).toFixed(2);

    return (
        <tr className="hover">
            <th>{idx + 1}</th>
            <td>{item?.name}</td>
            <td>{item?.productId}</td>
            <td>{datePart}</td>
            <td>${formattedProfit}</td>
        </tr>
    );
};
SaleTable.propTypes = {
    item: PropTypes.object,
    idx: PropTypes.number,
};
export default SaleTable;