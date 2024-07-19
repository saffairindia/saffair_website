import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./DashReqContributor.css";

export default function DashReqContributor() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/user/getusers`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/delete/${userIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleToggleContributor = async (userId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/toggleContributor/${userId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        // Update the user list with updated isAdmin status
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isContributor: !user.isContributor }: user
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const toggleIsReq = async (userId) => {
    try {
      // Make a PUT request to the backend API endpoint
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/toggleReq/${userId}`,
        {
          method: "PUT",
          credentials: "include", // If needed
        }
      );
      const data = await res.json();
      if (res.ok) {
        // Update the user list with updated isAdmin status
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isReq: !user.isReq } : user
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="table-auto p-4 mx-auto overflow-x-scroll md:overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Contributors</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Make Contributor</Table.HeadCell>
              {/* <Table.HeadCell>Information</Table.HeadCell>   */}
            </Table.Head>
            {users
              .filter((user) => user.isReq === true)
              .map((user) => (
                <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isContributor ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          // setShowModal(true);
                          setOpenModal(true);
                          setSelectedUser(user);
                        }}
                        className="font-medium text-green-500 hover:underline cursor-pointer"
                      >
                        View
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="5xl"
        className=" details_box absolute top-0 left-0 w-full h-full flex"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Contributor Information</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-600">
              {selectedUser && (
                <div className="gap-40">
                  {/* Display user information */}
                  <div className="personaldata thehead">
                    <p>
                      <span className="underline font-bold thehead">
                        Personal Details
                      </span>
                    </p>

                    <div className="p_info  ">
                      <p className="showninfo">
                        Username: {selectedUser.username}
                      </p>
                      <p className="showninfo">Email: {selectedUser.email}</p>
                      <p className="showninfo">
                        First Name: {selectedUser.firstName}
                      </p>
                      <p className="showninfo">
                        Last Name: {selectedUser.lastName}
                      </p>
                      <p className="showninfo">
                        Mobile Number: {selectedUser.number}
                      </p>
                      <p className="showninfo">Gender: {selectedUser.gender}</p>
                      <p className="showninfo">
                        Date of Birth: {selectedUser.dob}
                      </p>
                    </div>

                    <p className="underline thehead">Location</p>
                    <div className="p_info  ">
                      <p className="showninfo">
                        Country: {selectedUser.country}
                      </p>
                      <p className="showninfo">City: {selectedUser.city}</p>
                      <p className="showninfo">State: {selectedUser.state}</p>
                      <p className="showninfo">
                        Pincode: {selectedUser.pincode}
                      </p>
                      <p className="showninfo">Bio: {selectedUser.bio}</p>
                    </div>
                  </div>
                  <hr className="hr-line border-1 border-black mt-3 opacity-30 mb-3"></hr>
                  <div className="edudata">
                    <p>
                      <span className="underline font-bold thehead">
                        Education Details
                      </span>
                    </p>

                    <div className="p_info  ">
                      <p className="showninfo">
                        Institute Name: {selectedUser.instituteName}
                      </p>
                      <p className="showninfo">Degree: {selectedUser.degree}</p>
                      <p className="showninfo">
                        Field of Study: {selectedUser.fieldOfStudy}
                      </p>
                      <p className="showninfo">Grade: {selectedUser.grade}</p>
                      <p className="showninfo">
                        Start Date: {selectedUser.startDate}
                      </p>
                      <p className="showninfo">
                        End Date: {selectedUser.endDate}
                      </p>
                    </div>
                  </div>

                  <hr className="hr-line border-1 border-black mt-3 opacity-30 mb-3"></hr>
                  <div className="companydata">
                    <p>
                      <span className="underline font-bold thehead">
                        Work Details
                      </span>
                    </p>

                    <div className="p_info  ">
                      <p className="showninfo">
                        Position: {selectedUser.position}
                      </p>
                      <p className="showninfo">
                        Company Name: {selectedUser.companyName}
                      </p>
                      <p className="showninfo">
                        Employment Type: {selectedUser.employmentType}
                      </p>
                    </div>

                    <p className="underline mt-2 thehead">Company Location</p>
                    <div className="p_info  ">
                      <p className="showninfo">
                        Country: {selectedUser.companyCountry}
                      </p>
                      <p className="showninfo">
                        City: {selectedUser.companyCity}
                      </p>
                      <p className="showninfo">
                        State: {selectedUser.companyState}
                      </p>
                      <p className="showninfo">
                        Pincode: {selectedUser.companyPincode}
                      </p>
                    </div>
                    <div className="p_info  ">
                      <p className="showninfo">
                        Joining Date: {selectedUser.companyJoiningtDate}
                      </p>
                      <p className="showninfo">
                        End Date: {selectedUser.companyendDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenModal(false);
              handleToggleContributor(selectedUser._id);
              toggleIsReq(selectedUser._id);
            }}
          >
            I accept
          </Button>
          <Button color="gray"
            onClick={() => {
              toggleIsReq(selectedUser._id);
              setOpenModal(false)
            }}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
