import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/Redux/userSlice";
import { useEffect } from "react";

const Body = () => {
  // whenever app refreshes store is becoming empty that causes to login again. So we have token with us do something with it
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    store.user;
  });
  const fetchUser = async () => {
    if (user) return; //memozation
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.user[0]));
    } catch (err) {
      /// if not logged in from backend have sent 401 unauth..
      if (err.status === 401) {
        // console.lo("401 unauthorized");
      }
      navigate("/login");

      console.log("error while loading body componenet " + err);
    }
  };
  // above thing we are done an routes protecting also
  // so whenever user with out logging in tries to see feed page we are redirect to login page
  // when body refreshes in initial render useEffect will be called only once (b/c of [])
  // in useEffect we have checked weather user is there or not by token. as backend only sends response only when token is valid
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
