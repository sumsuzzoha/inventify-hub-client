import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useShopUserWise from "./useShopUserWise";

const useInvoiceShopWise = () => {

    const { loading } = useAuth();
    const [shop]= useShopUserWise();
    const axiosSecure = useAxiosSecure();

    const { data: allInvoices =[], isLoading: isInvLoading, refetch } = useQuery({
        queryKey: [shop, 'shopInvoice'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/shopInvoice?shop=${shop.shopId}`);
            return res.data;

        }
    });
    return [allInvoices,  isInvLoading, refetch,];
};

export default useInvoiceShopWise;