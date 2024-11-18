import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/Redux/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return;
  const { firstName, lastName, photoUrl, about, age, gender } = user;
  const dispatch = useDispatch();
  const isHideBtn = user?.isHideBtn || false;
  const handleClickInterested = async (id) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/interested/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed());
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickIgnore = async (id) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/ignored/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="card bg-base-100 h-auto w-96 shadow-xl hover:shadow-gray-700">
        <figure className="h-64 w-full flex items-center justify-center overflow-hidden">
          <img
            className="max-h-full max-w-full object-contain rounded-lg "
            src={photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          {!isHideBtn && (
            <div className="card-actions justify-center my-2">
              <button
                className="btn btn-primary mr-2"
                onClick={() => handleClickInterested(user._id)}
              >
                Interested
              </button>
              <button
                className="btn btn-secondary  ml-2"
                onClick={() => handleClickIgnore(user._id)}
              >
                Ignore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
