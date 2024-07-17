import { Helmet } from "react-helmet";


const Home = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Home | SCash</title>
            </Helmet>
          <img className="h-full" src="https://seamless.se/wp-content/uploads/2022/05/1.png" alt="home banner" />
        </div>
    );
};

export default Home;