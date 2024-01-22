
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ProductTabs from '../ProductTabs/ProductTabs';
import useShopUserWise from "../../../hooks/useShopUserWise";
import { useQuery } from "@tanstack/react-query";

const CategoryTabs = () => {
    const [shop, isShopLoading] = useShopUserWise();
    const [tabIndex, setTabIndex] = useState(0);
    const axiosSecure = useAxiosSecure();

    const { data: shopCategories = [], } = useQuery({
        queryKey: [shop?.shopId, 'categories'],
        enabled: !isShopLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories?shopId=${shop.shopId}`);
            // console.log(res.data);
            return res.data;

        }

    });


    return (
        <>
            <section className="w-full mx-auto my-24 text-center text-2xl">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        {
                            shopCategories.map((cat, idx) => <Tab key={idx}>{cat}</Tab>)
                        }


                    </TabList>
                    {
                        shopCategories.map((cat, idx) => <TabPanel key={idx}
                        >
                            <ProductTabs cat={cat}></ProductTabs>
                        </TabPanel>)
                    }


                </Tabs>
            </section>


        </>
    );
};

export default CategoryTabs;