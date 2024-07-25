import "./homepage.css";
import Joinletter from "../../component/homepageComponent/joinletter/Joinletter";
import Post from "../blog/Post";
import { useState, useEffect } from "react";
import WeatherUpdate from "../../component/homepageComponent/weatherupdates/WeatherUpdate";
import Vision from "../../component/homepageComponent/vision mission/Vision";
import Event from "../../component/homepageComponent/Event/Event";
// import AqiData from "../../component/AqiData/AqiData";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Fetch posts from the server
    fetch(`${process.env.REACT_APP_BACKEND_API}/api/post`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((fetchedPosts) => {
        const newsPosts = fetchedPosts.filter(
          (post) =>  post.publish === true
        );

        setPosts(newsPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  return (
    <>
      <div>
        <div className="z-50">
          <WeatherUpdate />

        </div>
        {/* <Healthadvice /> */}

        <div className="">

          <Vision />
        </div>
        <div className=" overflow-hidden">
          <Event />
        </div>
        <div>
          <Joinletter />
        </div>
        <div style={{ width: "100%" }}>
          <div
            className="readingtitle"
            style={{ display: "flex", alignItems: "center", margin: "20px" }}
          >
            <h2 className="text-2xl font-bold" style={{ marginRight: "10px" }}>
              Knowledge Centre
            </h2>
            <hr
              style={{
                flex: "1",
                height: "2px",
                backgroundColor: "#2196BA",
                border: "none",
              }}
            />
          </div>

          <div class="cards-wrapper" id="style-5">
            <div className="homeReadings">
              {posts.map((post) => (
                <Post key={post._id} {...post} color="black" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
