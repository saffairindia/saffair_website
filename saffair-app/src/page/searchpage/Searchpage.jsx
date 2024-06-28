import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SearchpostContext } from "../../page/Home";
import { useState, useEffect } from "react";
import Blogcard from "../../component/blogcard/Blogcard";

export default function Searchpage() {
  const { search, setSearch } = useContext(SearchpostContext);
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch posts from the server
    fetch(`${process.env.REACT_APP_BACKEND_API}/post`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  useEffect(() => {
    // Filter posts based on search keyword
    if (search.trim() !== "") {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredPosts);
    } else {
      setSearchResults([]);
    }
  }, [search, posts]);
  return (
    <div className=" mt-24" flex>
      <div className="searchbarMenu">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
        <input
          type="text"
          className="searchbarInput "
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-col">
        {/* Render search results if available */}
        {searchResults.length > 0 ? (
          <>
            {searchResults.map((post) => (
              <Blogcard key={post._id} {...post} />
            ))}
          </>
        ) : (
          <>
            {posts.map((post) => (
              <Blogcard key={post._id} {...post} color="black" />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
