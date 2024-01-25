import { Helmet } from "react-helmet-async";
import AboutUs from "../../../othersPages/About/About";
import Features from "../../../othersPages/Features/Features";
import QuestionSec from "../../../othersPages/QuestionSec/QuestionSec";
import CountdownTimer from "../../../othersPages/CountdownTimer/CountdownTimer";

const Home = () => {
    return (
        <div className="space-y-4">
            <Helmet>
                <title>Inventify Hub | Home</title>
            </Helmet>
            <CountdownTimer></CountdownTimer>
            <Features></Features>
            <QuestionSec></QuestionSec>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;