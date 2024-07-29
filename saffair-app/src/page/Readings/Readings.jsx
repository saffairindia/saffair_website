import { useEffect, useState, useContext } from "react";
import "./../blog/blog.css";
import UpdatesCon from "../newUpdates/UpdatesCon";
import Post from "../blog/Post";
import NewsCon from "../news/NewsCon";
import {  Spinner, Breadcrumb,  } from "flowbite-react";
import { Link } from "react-router-dom";
import { SearchpostContext } from "../Home";
import { HiHome } from "react-icons/hi";

import "./../../component/homepageComponent/weatherupdates/weatherupdate.css";

export default function Readings() {
  const { search } = useContext(SearchpostContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_API}/api/post`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = posts.filter(
    (post) => post.readingType === "Blog" && post.publish === true
  );

  const filteredNews = posts.filter((post) => post.readingType === "News");

  const filteredUpdates = posts.filter((post) => post.readingType === "Update");

  return (
    <>
      <div className="blog-container">
        {loading ? (
          <div className="spinnerr" style={{ height: "90vh" }}>
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            {/* <Navbar fluid rounded className="flex justify-center ">
              <Navbar.Collapse>
                <Link to="/blog">
                  <Navbar.Link
                    className="text-xl border-b-2 border-customBlue "
                    active
                  >
                    Blogs
                  </Navbar.Link>
                </Link>
                <Link to="/news">
                  <Navbar.Link className="text-xl  ">News</Navbar.Link>
                </Link>
                <Link to="/Update">
                  <Navbar.Link className="text-xl ">Updates</Navbar.Link>
                </Link>
              </Navbar.Collapse>
            </Navbar> */}

            <Breadcrumb style={{ fontFamily: "myFont" }}>
              <Link to={"/"} className="link">
                {" "}
                <Breadcrumb.Item icon={HiHome} className="p-2">
                  Home
                </Breadcrumb.Item>{" "}
              </Link>
              <p className="text-gray-500">&gt;</p>
              <Link to={"/readings"} className="link">
                <Breadcrumb.Item className="p-2">Kowledge centre</Breadcrumb.Item>
              </Link>
            </Breadcrumb>
            <div className="blogtitle">
              <Link to={"/blog"} className="link">
                <h2 className="text-2xl font-bold headtag" >
                  Blogs
                </h2>
              </Link>

              <hr />
            </div>

            <div className="grid">
              <>
                {filteredBlogs.map((post) => (
                  <Post key={post._id} {...post} color="black" />
                ))}
              </>
            </div>
            <div className="flex justify-center mt-2 ">
              <Link to={"/blog"}>
                <p style={{ color: '#2196ba' }}>
                  See more
                </p></Link>
            </div>

            <div className="blogtitle">
              <Link to={"/news"} className="link">
                <h2 className="text-2xl font-bold headtag" >
                  News
                </h2>
              </Link>


              <hr />
            </div>

            <div className="grid">
              <>
                {filteredNews.map((post) => (
                  <NewsCon key={post._id} {...post} color="black" />
                ))}
              </>
            </div>
            <div className="flex justify-center mt-2 ">
              <Link to={"/news"}>
                <p style={{ color: '#2196ba' }}>
                  See more
                </p></Link>
            </div>
            <div className="blogtitle">
              <Link to={"/Update"} className="link">
                <h2 className="text-2xl font-bold headtag">Updates</h2>
              </Link>
              <hr />
            </div>

            <div className="grid">
              <>
                {filteredUpdates.map((post) => (
                  <UpdatesCon key={post._id} {...post} color="black" />
                ))}
              </>
            </div>
            <div className="flex justify-center mt-2 mb-2">
              <Link to={"/Update"}>
                <p style={{ color: '#2196ba' }}>
                  See more
                </p></Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
