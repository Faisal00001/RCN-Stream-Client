
import List from "../List";



const Category = () => {
    return (
        <div className="container mx-auto">
            {/* <div className="flex gap-x-32 mt-20">
                <div className="flex gap-4 items-center cursor-pointer">
                    <div>
                        <FaPlayCircle className="text-4xl" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-semibold"> Movies</h3>
                    </div>
                </div>
                <div className="flex gap-4 items-center cursor-pointer">
                    <div >
                        <FaList className="text-4xl" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-semibold">Tv Shows</h3>
                    </div>
                </div>
            </div> */}

            <List title={`Trending Movies`}></List>
            <List title={`Trending Tv Shows`}></List>
            <List title={`Latest Movies`}></List>
            <List title={`Latest Tv Seires`}></List>
            {/* <List title={`Latest TV Shows`}></List> */}
            {/* <List title={`Coming Soon`}></List> */}

        </div>
    );
};

export default Category;