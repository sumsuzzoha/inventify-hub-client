
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from "react";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ProductTabs from '../ProductTabs/ProductTabs';

const CategoryTabs = () => {
    const [categories, setCategories] = useState([]);
    const [tabIndex, setTabIndex] = useState();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        (async () => {
            const response = await axiosSecure.get('/categories');
            setCategories(response.data);
            const initialIndexx = response.data.findIndex(item => item.toLowerCase());
            setTabIndex(initialIndexx);
            // console.log(response.data);

        })();
    }, []);


    return (
        <>
            <section className="w-full mx-auto my-24 text-center text-2xl">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        {
                            categories.map((cat, idx) => <Tab key={idx}>{cat}</Tab>)
                        }


                    </TabList>
                    {
                        categories.map((cat, idx) => <TabPanel key={idx}
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