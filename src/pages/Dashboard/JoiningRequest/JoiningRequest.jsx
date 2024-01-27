import { Helmet } from "react-helmet-async";
import DashPageHeader from "../../../components/DashPageHeader/DashPageHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useShopUserWise from "../../../hooks/useShopUserWise";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CandidateCard from "../../Home/JoinShop/CandidateCard";

const JoiningRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [shop, isShopLoading] = useShopUserWise();
    const [joinReqFilter, setJoinReqFilter] = useState();

    const { data: joinRequests = [], refetch} = useQuery({
        queryKey: [shop, 'joiningReq'],
        enabled: !isShopLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/joiningReq?shopId=${shop.shopId}`);
            return res.data;
        }
    });

    const handleFilterChange = (e) => {
        setJoinReqFilter(e.target.value);
    };

    const filteredJoinReq = joinRequests.filter(joinRequest => {
        if (joinReqFilter === null || joinReqFilter === undefined || joinReqFilter === '') {
            return true; // No filter applied
        }
        return joinRequest.requests === joinReqFilter;
    });

    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Joining Request</title>
            </Helmet>
            <DashPageHeader
                title={"Join Request Management"}
                subTitle={"Join Request in this Shop"}
                description={'Manage your join request efficiently'}
                data={filteredJoinReq}
            // dynamicLink={'/dashboard/checkOut'}
            // link_Btn_Title={'Generate Invoice'}
            // icon={<FaShoppingCart />}
            // items={cartItems}
            // func={handleGenarateInvoice}
            ></DashPageHeader>
            <div className="w-full text-center mx-auto">
                <select
                    value={joinReqFilter}
                    onChange={handleFilterChange}
                    className="ml-2 p-2 border rounded"
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                </select>

                {/* Display filtered join requests */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
                    {filteredJoinReq.map(joinReq=><CandidateCard key={joinReq._id} data={joinReq} refetch={refetch}></CandidateCard>)}
                </div>
            </div>
        </div>
    );
};

export default JoiningRequest;