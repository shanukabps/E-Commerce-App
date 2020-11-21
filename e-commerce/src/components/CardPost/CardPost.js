import React, { useEffect, useState } from "react";
import { useStateValue } from "../cotexApi/StateProvider";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import axios from "../../axios";
import { toast } from "react-toastify";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { DeleteForever } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./CardPost.css";
import SendIcon from "@material-ui/icons/Send";
import StorefrontIcon from "@material-ui/icons/Storefront";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Avatar from "@material-ui/core/Avatar";

function CardPost({ datafrom, showComment }) {
  const [data, setdata] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setdata(datafrom);
  }, [datafrom]);

  const likePost = async (id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/like", { postId: id })
      .then((req) => {
        toast.info("You recommended ");

        //instanly updata unlikelike
        const newData = data.map((item) => {
          if (item._id === req.data._id) {
            return req.data;
          } else {
            return item;
          }
        });

        setdata(newData);
        //  console.log('posts', data)
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error("User Login Error"); // some reason error message
          console.log(e.response.data);
        } else {
          toast.error("Network Error Refresh the Page");
        }
      });
  };
  const unlikePost = async (id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/unlike", { postId: id })
      .then((req) => {
        toast.warning("Unliked");
        //  console.log('posts', req.posts)

        //instanly updata unlikelike
        const newData = data.map((item) => {
          if (item._id === req.data._id) {
            return req.data;
          } else {
            return item;
          }
        });

        setdata(newData);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error("User Login Error"); // some reason error message
        } else {
          toast.error("Network Error Refresh the Page");
        }
      });
  };

  const deletePost = async (postid) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .delete(`/deletepost/${postid}`)
      .then((result) => {
        // console.log(result);
        //instanly delete unlikelike
        const newData = data.filter((item) => {
          return item._id !== result.data._id;
        });

        setdata(newData);
      })
      .catch((err) => console.log(err.message));
  };

  //make comments
  const makeComment = async (text, id) => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("jwt");
    await axios
      .put("/comments", { postId: id, text: text })
      .then((req) => {
        toast.warning("Comments Posted");
        // console.log("comment", req);

        //instanly updata unlikelike
        const newData = data.map((item) => {
          if (item._id === req.data._id) {
            return req.data;
          } else {
            return item;
          }
        });

        setdata(newData);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          toast.error("User Login Error"); // some reason error message
        } else {
          toast.error("Network Error Refresh the Page");
        }
      });
  };

  const addToBasket = (item) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: item._id,
        title: item.body,
        image: item.photo,
        price: item.price,
      },
    });
  };

  return (
    <div>
      {data ? (
        <div className="card_disply">
          {data.map((item) => {
            return (
              <div>
                <div key={item._id} className="card">
                  <div className="cardmargin">
                    <div className="cardPost_delete">
                      <h3>
                        <Link
                          className="name_link"
                          to={
                            item.postedBy._id !== user._id
                              ? "/profile/" + item.postedBy._id
                              : "/profile"
                          }
                        >
                          {item.postedBy.name}

                          <StorefrontIcon fontSize="small" color="secondary" />
                        </Link>
                      </h3>

                      {item.postedBy._id === user._id && (
                        <div
                          onClick={() => deletePost(item._id)}
                          className="deleteicon"
                        >
                          <DeleteForever />
                        </div>
                      )}
                    </div>

                    <h6>{item.title}</h6>
                    <div className="card_body">{item.body}</div>
                    <p>$ {item.price}</p>
                    <h6>store {item.unit}</h6>

                    <Link className="name_link" to={"/post/" + item._id}>
                      <div className="card_image">
                        <img src={item.photo} alt="" className="card_img" />
                      </div>
                    </Link>

                    <h5 className="likecount">
                      {item.like.length} people recommended
                    </h5>
                    <div className="card_content">
                      <div className="card_icon">
                        {item.like.includes(user._id) ? (
                          <div
                            className="card_unlike"
                            onClick={() => unlikePost(item._id)}
                          >
                            <ThumbDownIcon />
                          </div>
                        ) : (
                          <div
                            onClick={() => likePost(item._id)}
                            className="card_like"
                          >
                            <ThumbUpIcon />
                          </div>
                        )}
                        <button
                          className="buttonb cardb"
                          onClick={() => addToBasket(item)}
                        >
                          Add to Cart
                          <AddShoppingCartIcon />
                        </button>
                      </div>
                    </div>
                  </div>

                  {showComment ? (
                    <>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          // console.log(e.target[0].value)
                          makeComment(e.target[0].value, item._id);
                        }}
                      >
                        <div className="comment">
                          <div className="comment_inputa">
                            <input
                              className="conmment_input_input"
                              type="text"
                              placeholder="add a comment"
                            />
                          </div>
                          <button className="coment_send_button" type="submit">
                            <SendIcon />
                          </button>
                        </div>
                      </form>

                      <div className="comment_box">
                        {item.comments.map((comment) => {
                          return (
                            <div className="comment_name">
                              <h5 key={comment._id}>
                                {comment.postedBy.name}&#128073;&#127996;
                                <span key={comment._id}> {comment.text}</span>
                              </h5>
                              <div className="comentdelete">
                                {/* <DeleteIcon fontSize="small" /> */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>Loding</h1>
      )}
    </div>
  );
}

export default CardPost;
