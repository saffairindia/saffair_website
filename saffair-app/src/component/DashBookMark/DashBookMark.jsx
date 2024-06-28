import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";

export default function DashBookMark() {
  const { currentUser } = useSelector((state) => state.user);
  // const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/bookmarks/${currentUser._id}`
        );
        setBookmarks(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [currentUser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <Table hoverable>
        {/* Table headers */}
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          {/* <Table.HeadCell>BookMark</Table.HeadCell> */}
        </Table.Head>
        {/* Table body */}
        {bookmarks.map((post) => (
          <Table.Body key={post._id} className="divide-y">
            <Table.Row className="bg-white">
              <Table.Cell>
                {" "}
                {new Date(post.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <Link
                  className="font-medium text-gray-900 dark:text-white"
                  to={`/post/${post._id}`}
                >
                  {" "}
                  <img
                    src={post.image1}
                    alt={post.title}
                    className="w-20 h-10 object-cover bg-gray-500"
                  />
                </Link>
              </Table.Cell>

              <Table.Cell>
                <Link
                  className="font-medium text-gray-900 dark:text-white"
                  to={`/post/${post._id}`}
                >
                  <span>{post.title}</span>
                </Link>
              </Table.Cell>
              <Table.Cell>
              <Link
                  className="font-medium text-gray-900 dark:text-white"
                  to={`/post/${post._id}`}
                >
                  <span>{post.contributionType}</span>
                </Link></Table.Cell>
              {/* <Table.Cell>
                <span
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="font-medium text-red-500 hover:underline cursor-pointer"
                >
                  remove
                </span>
              </Table.Cell> */}
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
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
              Are you sure you want to delete this bookmark?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure">Yes, I'm sure</Button>
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
