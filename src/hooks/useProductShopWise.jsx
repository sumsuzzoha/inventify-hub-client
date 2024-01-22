import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useShopUserWise from "./useShopUserWise";

const useProductShopWise = () => {
    const { loading } = useAuth();
    const [shop, isShopLoading] = useShopUserWise();
    // console.log(shop.shopId);
    const axiosSecure = useAxiosSecure();

    const { data: products, isLoading: isProductLoading, refetch } = useQuery({
        queryKey: [shop?.shopId, 'products'],
        enabled: !loading || !isShopLoading,
        queryFn: async () => {
            // console.log(user.email);
            const res = await axiosSecure.get(`/products?shop=${shop.shopId}`);
            // console.log(res.data);
            return res.data;

        }
    });
    // console.log(typeof refetch)
    return [products, isProductLoading, refetch,];

};

export default useProductShopWise;