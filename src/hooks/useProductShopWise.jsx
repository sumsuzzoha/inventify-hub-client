import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useShopUserWise from "./useShopUserWise";

const useProductShopWise = (paramsShopId) => {
    const { loading } = useAuth();
    const [shop, isShopLoading] = useShopUserWise();
    const shopId =  paramsShopId || shop?.shopId;
    const axiosSecure = useAxiosSecure();

    const { data: products, isLoading: isProductLoading, refetch } = useQuery({
        queryKey: [shopId, 'products'],
        enabled: !loading || !isShopLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?shop=${shopId}`);
            return res.data;

        }
    });
    return [products, isProductLoading, refetch,];

};

export default useProductShopWise;