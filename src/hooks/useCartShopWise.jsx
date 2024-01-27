import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useShopUserWise from "./useShopUserWise";

const useCartShopWise = () => {
    const [shop, isShopLoading] = useShopUserWise();
    const axiosSecure = useAxiosSecure();

    const { data: cartItems, isLoading: isProductLoading, refetch } = useQuery({
        queryKey: [shop?.shopId, 'carts'],
        enabled: !isShopLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?shop=${shop?.shopId}`);
            return res.data;

        }
    });
    return [cartItems, isProductLoading, refetch,];

};

export default useCartShopWise;