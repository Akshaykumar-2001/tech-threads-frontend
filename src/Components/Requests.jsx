import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/Redux/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      // console.log(res?.data?.requests);
      dispatch(addRequests(res?.data?.requests));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/accepted/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/rejected/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!requests) return <h1>null</h1>;

  if (requests.length === 0) return <h1>No requests</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-zinc-400 font-bold text-3xl ">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="  m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto "
          >
            <div className="flex">
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4 ">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
            <div className="p-2">
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  handleAccept(request._id);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => {
                  handleReject(request._id);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
