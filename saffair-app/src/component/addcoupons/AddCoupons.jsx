import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import 'react-circular-progressbar/dist/styles.css'
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../../redux/user/userSlice'

import { useDispatch } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function AddCoupons() {
  // const [biofield, setBiofield] = useState("");
  const { currentUser, error, loading } = useSelector((state) => state.user)

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made')
      return
    }

    try {
      dispatch(updateStart())
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        },
      )
      const data = await res.json()
      if (!res.ok) {
        dispatch(updateFailure(data.error))
        setUpdateUserError(data.error)
      } else {
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile updated successfully")
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }
  }
  const handleDeleteUser = async () => {
    setShowModal(false)
    try {
      dispatch(deleteUserStart())
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/user/delete/${currentUser._id}`,
        {
          credentials: 'include',
          method: 'DELETE',
        },
      )
      const data = await res.json()
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message))
      } else {
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignout = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/user/signout`, {
        method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Add Coupons</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          type="text"
          id="firstName"
          placeholder="first name"
          defaultValue={currentUser.firstName}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="lastName"
          placeholder="last name"
          defaultValue={currentUser.lastName}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="coins"
          placeholder="Enter coins"
          onChange={handleChange}
        />

        <Button
          type="submit"
          gradientDuoTone="cyanToBlue"
          outline
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        {!currentUser.isAdmin && (
          <span onClick={() => setShowModal(true)} className="cursor-pointer">
            Delete Account
          </span>
        )}
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
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
              Are you sure you want to delete your account?
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
    </div>
  )
}
