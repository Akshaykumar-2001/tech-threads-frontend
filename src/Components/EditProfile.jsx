import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/Redux/userSlice";
import Toast from "./Toast";

const EditProfile = () => {
  const user = useSelector((store) => store?.user);
  // console.log(user);
  const [toast, setToast] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(""); //skills
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const updateUser = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
    } catch (err) {
      setError(err?.response?.data || "something went wrong login componenet");
      console.log("ERROR in edit profile component " + err);
    }
  };
  const handleSaveProfileClick = () => {
    updateUser();
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 4000);
  };
  useEffect(() => {
    if (user !== null) {
      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
      setAge(user?.age || "");
      setGender(user?.gender || "");
      setAbout(user?.about || "");
      setPhotoUrl(user?.photoUrl || "");
    }
  }, [user]);
  if (!user)
    return (
      <h1 className="text-bold text-zinc-400 font-bold text-3xl ">
        Profile Loading...
      </h1>
    );
  return (
    <div className="flex flex-row justify-center">
      {toast && <Toast message={"Profile Updated successfully !"} />}
      <div className="flex justify-center my-10 pb-12 pr-4">
        <div className="card bg-base-300 text-primary-content w-96">
          <div className="card-body">
            <h1 className="card-title justify-center text-zinc-400 font-bold">
              Edit Profile
            </h1>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                value={firstName}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Photo Url</span>
              </div>
              <input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
              />
            </label>

            <div className="card-actions justify-center">
              <p className="text-red-600">{error}</p>
              <button
                className="text-white btn hover:shadow-xl bg-primary mt-3"
                onClick={handleSaveProfileClick}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-4">
        <UserCard
          user={{
            firstName,
            lastName,
            photoUrl,
            about,
            age,
            gender,
            isHideBtn: true,
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
