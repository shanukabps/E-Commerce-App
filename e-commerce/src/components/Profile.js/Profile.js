import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useStateValue } from "./../cotexApi/StateProvider";
import { toast } from "react-toastify";
import axios from "../../axios";
import CardPost from "../CardPost/CardPost";

function Profile() {
  const [data, setdata] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  //console.log(user)
  //console.log('data',data)

  // console.log('pro', data)

  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("jwt"),
  };

  useEffect(() => {
    // axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    axios
      .get("/mypost", { headers })
      .then((req) => {
        // console.log(req.data);
        setdata(req.data.myposts);
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

  const uploadPhoto = async () => {
    let formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "social-App");
    formData.append("cloud_name", "dcfrl1b41");

    await axios
      .post("https://api.cloudinary.com/v1_1/dcfrl1b41/image/upload", formData)
      .then((req) => {
        //   console.log('server',req.data);

        setUrl(req.data.url);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, pic: req.data.url })
        );

        dispatch({
          type: "UPDATEPIC",
          user: {
            pic: req.data.url,
          },
        });
        if (url) {
          axios
            .put("/updatepic", { pic: url }, { headers })
            .then((req) => {
              toast.success("Image Changed");
              setUrl("");
              // console.log('aftersave',req.data);
            })
            .catch((e) => {
              if (e.response && e.response.data) {
                toast.error(e.response.data.error.message); // some reason error message // some reason error message
                console.log("body pst", e.response.data.error.message);
              } else {
                toast.error("Network Error");
                console.log("ad", e);
              }
            });
        }
      })

      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error(e.response.data.error.message); // some reason error message // some reason error message
          console.log("body pst", e.response.data.error.message);
        } else {
          toast.error("Network Error");
          console.log("ad", e);
        }
      });
  };

  console.log("url", user.role == 1);

  return (
    <div className="div">
      {user.role == 1 ? (
        <div key={user._id} className="profile">
          <div>
            <div className="profile_header">
              <div className="profile_image">
                <img
                  alt="profile"
                  className="profile_pic"
                  src={user ? user.pic : "Loding"}
                />
                <div className="profilechange">
                  <button
                    className="button"
                    onClick={() => uploadPhoto()}
                    type="submit"
                  >
                    change Shop banner
                  </button>
                  <div className="input custominput">
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="profile_details">
                <h4>{user.name}</h4>
                <h6>{user.email}</h6>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "25vw",
                  }}
                  className="profile_rating"
                >
                  <h5>{data.length} Items</h5>
                  <h5>{user.followers.length} Recommended Your Shop</h5>
                </div>
              </div>
            </div>
          </div>

          <CardPost datafrom={data} showComment={true} />
        </div>
      ) : (
        <h1>no profile</h1>
      )}
    </div>
  );
}

export default Profile;
