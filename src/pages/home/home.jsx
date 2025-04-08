
import Category from "../../components/Category/Category";
import Featured from "../../components/Feature/Featured";
import Footer2 from "../../components/Footer/Footer";
import List from "../../components/List";
import Loader from "../../components/Loader/Loader";
import useAllCategories from "../../hooks/useAllCategories";
import Navbar from "../../shared/navbar";

const Home = () => {
    const [allCategories, allCategoriesLoading] = useAllCategories()
    if (allCategoriesLoading) {
        return <Loader />
    }
    return (
        <div className="bg-[#0C0C0C] text-white">
            <Navbar />

            <Featured type={""} />
            {/* <List title={"Trending"} />
            <List title={"Science Fiction"} /> */}
            {/* {
                allCategories?.categories.map((item, index) => {
                    return <List key={index} title={item?.category} />
                })
            } */}
            <Category />


            {/* <List title={"Horror"} />
            <List title={"Romance"} /> */}
            <Footer2 />

        </div>
    );
};

export default Home;