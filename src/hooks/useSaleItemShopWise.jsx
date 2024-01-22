import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useShopUserWise from "./useShopUserWise";

const useSaleItemShopWise = () => {
    const [shop, isShopLoading] = useShopUserWise();
    // console.log(shop.shopId)
    const axiosSecure = useAxiosSecure();

    const { data: saleItems = [], } = useQuery({
        queryKey: [shop.shopId, 'invoices'],
        enabled: !isShopLoading ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/saleItems?shop=${shop.shopId}`);
            // console.log(res.data);
            return res.data;

        }
    });

    return [saleItems]
};

export default useSaleItemShopWise;