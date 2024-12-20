import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Toast from "./Toast";

const Login = () => {
  const [isSignIn, setSignUp] = useState(false);
  const [error, setError] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNewUser, setIsNewUSer] = useState(false);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewUserClick = () => {
    setSignUp(!isSignIn);
  };
  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      //add to store
      //whenever ajust now signed in user is logging in then redirect to edit profile
      dispatch(addUser(res?.data?.user));
      if (isNewUser) {
        navigate("/profile");
        setIsNewUSer(false);
      } else navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong login componenet");
      console.log(err);
    }
  };
  const handleSignin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      setSignUp(false);
      setIsNewUSer(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 4000);
    } catch (err) {
      setError(err?.response?.data || "something went wrong login componenet");
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-10 mb-20">
      {toast && <Toast message={"Signed Up Successfully"} />}
      <div className="card bg-base-300 text-primary-content w-96">
        <div className="card-body">
          <h1 className="card-title justify-center text-zinc-400 font-bold">
            {isSignIn ? "Sign In" : "Login"}
          </h1>
          {isSignIn && (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name :</span>
              </div>
              <input
                value={firstName}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          )}
          {isSignIn && (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name :</span>
              </div>
              <input
                value={lastName}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID : {emailId}</span>
            </div>
            <input
              value={emailId}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password :</span>
            </div>
            <input
              value={password}
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="card-actions justify-center">
            <p className="text-red-600">{error}</p>
            <button
              className="text-white btn hover:shadow-xl bg-primary mt-3"
              onClick={isSignIn ? handleSignin : handleLogin}
            >
              {isSignIn ? "Sign In" : "Login"}
            </button>
          </div>
          <div>
            <p
              className=" text-gray-300 hover:underline cursor-pointer justify-center"
              onClick={handleNewUserClick}
            >
              {isSignIn ? "Already an User? Login" : "New User? Sign In"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
