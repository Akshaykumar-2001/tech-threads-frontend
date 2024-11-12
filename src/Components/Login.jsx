import React, { useState } from "react";

const Login = () => {
  const [isSignIn, setSignUp] = useState(false);
  const handleSignInClick = () => {
    setSignUp(!isSignIn);
  };
  return (
    <div className="flex justify-center my-10 ">
      <div className="card bg-base-300 text-primary-content w-96">
        <div className="card-body">
          {isSignIn && (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name :</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          )}
          {isSignIn && (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name :</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID :</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password :</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <div className="card-actions justify-center">
            <button className="text-white btn hover:shadow-xl bg-primary mt-3">
              {isSignIn ? "Sign In" : "Login"}
            </button>
          </div>
          <div>
            <p
              className=" text-gray-300 hover:underline cursor-pointer justify-center"
              onClick={handleSignInClick}
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
