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
            // console.log(user.email);
            const res = await axiosSecure.get(`/carts?shop=${shop?.shopId}`);
            // console.log(res.data);
            return res.data;

        }
    });
    // console.log(typeof refetch)
    return [cartItems, isProductLoading, refetch,];

};

export default useCartShopWise;