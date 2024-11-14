import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, photoUrl, about, age, gender } = user;
  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-100 h-auto w-96 shadow-xl">
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
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary mr-2">Interested</button>
            <button className="btn btn-secondary  ml-2">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
