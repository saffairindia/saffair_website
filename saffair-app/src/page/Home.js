import Navbar from "../component/navbar/Navbar";
// import "./home.css";
import Weather from "./weather/Weather";
import { createContext, useState } from "react";
import CityContext from "../context/CityContext";
import Blog from "./blog/Blog";
import CreatePost from "./blog/pages/createpost/CreatePost";
import AirQuality from "./airquality/AirQuality";
import { Route, Routes } from "react-router-dom";
import PostPage from "./blog/pages/postpage/PostPage";
import EditPost from "./blog/pages/editpost/EditPost";
import News from "./news/News";
import Community from "./community/Community";
import Login from "./login/Login";
import Register from "./register/Register";
import Homepage from "./home/Homepage";
import Footer from "../component/footer/Footer";
import Searchpage from "./searchpage/Searchpage";
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from "../component/PrivateRoute";
import OnlyAdminPrivateRoute from "../component/onlyAdminPrivateRoute";
import AboutUs from "./AboutUS/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import Readings from "./Readings/Readings";
import PrivacypolicyPage from "./Privacypolicy/Privacypolicy";
import Updates from "./newUpdates/Updates";
import Showevent from "../component/homepageComponent/Event/Showevent";
import ContributorPost from "../component/contributorPost/ContributorPost";
import EditContributorPost from "./blog/pages/editpost/EditContributorPost";
import EventPage from "../component/eventpage/EventPage";
import Events from "../component/homepageComponent/Event/Events"
import ProductPage from "./product/ProductPage"
import ReviewPost from "./blog/pages/editpost/ReviewPost";
import Calculator from "./calculator/Calculator";
// import { Discuss } from "react-loader-spinner";
import { useSelector } from "react-redux";
import AdminLogin from "./login/AdminLogin";
import NotFound from "./404";

export const WeatherImageContext = createContext();

export const SearchpostContext = createContext();
export const SearchContext = createContext();
export const cityContext = createContext();
export const aqiDataContext = createContext();



export default function Home() {
  const [newCity, setNewCity] = useState("surat");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [aqiData, setAqiData] = useState("surat");
  const [airData, setAirData] = useState({
    imageUrl: "",
    aqiValue: "",
    airQuality: "",
    city: ""
  });
  const theme = useSelector((state) => state.theme.mode);


  return (
    <div className={theme === "light" ? "light-mode" : "dark-mode"}>

    <WeatherImageContext.Provider value={{ airData, setAirData }}>
      <SearchContext.Provider value={{ newCity, setNewCity }}>
        <cityContext.Provider value={{ location, setLocation }}>
          <SearchpostContext.Provider value={{ search, setSearch }}>
            <aqiDataContext.Provider value={{ aqiData, setAqiData }}>
              <CityContext />

              <div>
                <Navbar />
              </div>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Showevent" element={<Showevent />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/privacypolicy" element={<PrivacypolicyPage />} />
                <Route path="/readings" element={<Readings />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contactus" element={<ContactUs />} />
                {/* <div style={{ minHeight: "800px" }}> */}
                <Route path="/post/:title" element={<PostPage />} />
                <Route path="/events/:id" element={<EventPage />} />
                <Route path="/events" element={<Events />} />
                <Route path="/product" element={<ProductPage />} />
                {/* </div> */}
                <Route path="/airquality" element={<AirQuality />} />
                <Route path="/community" element={<Community />} />
                <Route path="/news" element={<News />} />
                <Route path="/update" element={<Updates />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/searchpage" element={<Searchpage />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<OnlyAdminPrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/createblog" element={<CreatePost />} />
                 
                  <Route path="/edit/:postId" element={<EditPost />} />
                  <Route
                    path="/editContributor/:postId"
                    element={<EditContributorPost />}
                  />
                  <Route
                    path="/reviewContributor/:postId"
                    element={<ReviewPost />}
                  />
                  <Route
                    path="/contributorpost/:userId"
                    element={<ContributorPost />}
                  />
                </Route>
                <Route path="*" element={<NotFound />} />

              </Routes>

              <Footer />
            </aqiDataContext.Provider>
          </SearchpostContext.Provider>
        </cityContext.Provider>
      </SearchContext.Provider>
    </WeatherImageContext.Provider>
    </div>
  );
}