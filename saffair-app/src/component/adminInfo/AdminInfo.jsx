import React from "react";
import "./adminInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faLinkedin,
  faSquareXTwitter,
  faSquareInstagram
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const AdminInfo = ({ userId }) => {
  const [postAdmin, setPostAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/user/${userId}`);
        if (!res.ok) {
          throw new Error("Fail To Fetch postAdmin");
        }
        const data = await res.json();
        setPostAdmin(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  if (!postAdmin) return null;

  return (
    <>
      <div className="rdesign rounded-lg p-4">
        <div className="group flex">
          <div className="imgs mr-4">
            <img
              src={postAdmin.profilePicture}
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              alt="img"
            />
          </div>
          <div className="text flex flex-col justify-center">
            <p className="text-white text-3xl font-bold ">
              {postAdmin.firstName} {postAdmin.lastName}
            </p>
            <p className="text-white text-sm">
              {postAdmin.isAdmin ? "Team Saffair" : "Contributor"}
            </p>
            <hr className="hor-line w-full my-2" />
          </div>
        </div>

        <p className="text-white text-sm md:text-base mt-2">{postAdmin.bio}</p>
        <div className="icon mt-2">
          {postAdmin && postAdmin.facebook && (
            <a href={postAdmin.facebook} target="_blank">
              <FontAwesomeIcon className="icons mr-3" icon={faSquareFacebook} />
            </a>
          )}
          {postAdmin && postAdmin.twitter && (
            <a href={postAdmin.twitter} target="_blank">
              <FontAwesomeIcon className="icons mr-3" icon={faSquareXTwitter} />
            </a>
          )}
          {postAdmin && postAdmin.linkedin && (
            <a href={postAdmin.linkedin} target="_blank">
              <FontAwesomeIcon className="icons mr-3" icon={faLinkedin} />
            </a>
          )}
          {postAdmin && postAdmin.instagram && (
            <a href={postAdmin.instagram} target="_blank">
              <FontAwesomeIcon className="icons" icon={faSquareInstagram} />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminInfo;
