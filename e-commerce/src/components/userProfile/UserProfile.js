import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "./../cotexApi/StateProvider";
import { toast } from "react-toastify";
import axios from "../../axios";
import CardPost from "../CardPost/CardPost";

function UserProfile() {
  const { userid } = useParams();

  const [userposts, setposts] = useState([]);
  // const [mypostId, setMypostId] = useState([]);
  const [userProfile, setuserProfile] = useState();
  const [{ user }, dispatch] = useStateValue();
  const [showfollowbutton, setShowfollowbutton] = useState(
    user ? !user.following.includes(userid) : true
  );

  // console.log(userProfile)
  //  myposts.map(a=>{
  //      console.log(a)
  //  })
  // console.log(!user.following.includes(userid))

  //header
  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    axios
      .get(`/user/${userid}`)
      .then((req) => {
        //console.log('aaa',req.data);

        setposts(req.data.posts);
        setuserProfile(req.data.user);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error(e.response.data); // some reason error message
        } else {
          console.log(e.message);

          toast.error("Network Error");
        }
      });
  }, []);

  //posts
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("jwt"),
  };

  const unfollowUser = async () => {
    await axios
      .put("/unfollow", { followId: userid }, { headers })
      .then((data) => {
        // console.log("sssas", data.data);
        dispatch({
          type: "UPDATE",
          user: {
            followers: data.data.followers,
            following: data.data.following,
          },
        });
        localStorage.setItem("user", JSON.stringify(data.data));

        setShowfollowbutton(true);

        // setuserProfile(data.data)
        setuserProfile((prevState) => {
          const newFollower = prevState.followers.filter(
            (item) => item != data.data._id
          );
          console.log("swqwq", newFollower);
          return {
            ...prevState,
            followers: newFollower,
          };
        });
      });
  };

  const followUser = async () => {
    await axios
      .put("/follow", { followId: userid }, { headers })
      .then((data) => {
        // console.log("sssas", data.data);
        dispatch({
          type: "UPDATE",
          user: {
            followers: data.data.followers,
            following: data.data.following,
          },
        });
        localStorage.setItem("user", JSON.stringify(data.data));
        setShowfollowbutton(false);

        setuserProfile((prev) => {
          return {
            ...prev,
            followers: [...prev.followers, data.data._id],
          };
        });
      });
  };

  return (
    <>
      {userProfile ? (
        <div className="profile">
          <div className="profile_header">
            <div className="profile_image">
              <img
                alt="userpost"
                className="profile_pic"
                src={userProfile.pic}
              />
            </div>
            <div className="profile_details">
              <h4>{userProfile.name}</h4>
              <h5>{userProfile.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "40vw",
                }}
                className="profile_rating"
              >
                <h5>{userposts.length} Items</h5>
                <h5>{userProfile.followers.length} Recommended </h5>
                {/* <h5>{userProfile.following.length} followig</h5> */}
              </div>
              {showfollowbutton ? (
                <button className="button" onClick={() => followUser()}>
                  Recommend
                </button>
              ) : (
                <button className="button" onClick={() => unfollowUser()}>
                  Unrecommend
                </button>
              )}
            </div>
          </div>

          <CardPost datafrom={userposts} showComment={true} />
        </div>
      ) : (
        <h2>Loding..........</h2>
      )}
    </>
  );
}

export default UserProfile;
