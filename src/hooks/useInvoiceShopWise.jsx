import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useShopUserWise from "./useShopUserWise";

const useInvoiceShopWise = () => {

    const { loading } = useAuth();
    const [shop]= useShopUserWise();
    const axiosSecure = useAxiosSecure();
    // console.log(invId);

    const { data: allInvoices =[], isLoading: isInvLoading, refetch } = useQuery({
        queryKey: [shop, 'shopInvoice'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/shopInvoice?shop=${shop.shopId}`);
            // console.log(res.data);
            return res.data;

        }
    });
    // console.log(typeof refetch)
    return [allInvoices,  isInvLoading, refetch,];
};

export default useInvoiceShopWise;