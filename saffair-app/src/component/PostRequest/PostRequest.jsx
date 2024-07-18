import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaMinus,FaCheck, FaTimes } from "react-icons/fa";
import {
  Avatar,
  Navbar as Nb,
} from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the link icon

export default function PostRequest() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/getposts`);
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          const filteredPosts = data.posts.filter((post) => !post.publish);
          // const fp = filteredPosts.filter((post) => post.isContributor);
          setUserPosts(filteredPosts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Filter userPosts based on searchQuery
  const filteredPosts = userPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="mb-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search posts"
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {(currentUser.isAdmin || currentUser.isContributor) &&
        filteredPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Contribution type</Table.HeadCell>
              <Table.HeadCell>Reward </Table.HeadCell>

              <Table.HeadCell>Reviewed</Table.HeadCell>
              <Table.HeadCell>published</Table.HeadCell>

              <Table.HeadCell>Delete</Table.HeadCell>

            </Table.Head>
            {filteredPosts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post._id}`}>
                      <img
                        src={post.image1}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="text-center align-middle">
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post._id}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="text-center align-middle">{post.contributionType}</Table.Cell>
                  <Table.Cell className="text-center align-middle">
                    {post.coinalloted ? (
                      <div className="flex items-center gap-1">
                        <span className="ml-2">{post.coinalloted}</span>

                        <Avatar
                          alt="coin"
                          img="../assets/coin2.png"
                          rounded
                          className="userprofile w-6 h-auto"
                        />
                      </div>
                    ) : (
                      <p className="text-red-500 text-3xl">-</p>
                    )}
                  </Table.Cell>


                  <Table.Cell className="text-center  align-middle">
                    {post.isReviewed ? (
                      < div className="flex gap-2 flex-row ">
                        <FaCheck className="text-green-500" />

                      </div>
                    ) : (
                      < div className="flex flex-row gap-2" >
                        <FaTimes className="text-red-500" />
                        <Link
                          className="text-teal-500 hover:underline"
                          to={`/reviewContributor/${post._id}`}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-center align-middle">
                    {post.contributionType === 'join our campaigns' ? (
                      <div className="flex flex-row gap-2">

                        <FaMinus className="text-gray-500" />
                      </div>
                    ) : (
                      post.publish ? (
                        < div className="flex gap-2 flex-row">
                          <FaCheck className="text-green-500" />

                        </div>
                      ) : (
                        < div className="flex flex-row gap-2" >
                          <FaTimes className="text-red-500" />
                          <Link
                            className="text-teal-500 hover:underline"
                            to={`/editContributor/${post._id}`}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </Link>
                        </div>
                      )
                    )}

                  </Table.Cell>
                  <Table.Cell className="text-center align-middle">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>

                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {/* {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )} */}
        </>
      ) : (
        <p>No posts match your search criteria.</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
