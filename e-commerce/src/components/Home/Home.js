import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "../../axios";
import { toast } from "react-toastify";
import SearchIcon from "@material-ui/icons/Search";
import CardPost from "../CardPost/CardPost";

function Home() {
  const [data, setdata] = useState([]);

  const [search, setsearch] = useState([]);
  const [oldData, setOldData] = useState([]);

  useEffect(() => {
    // axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwt');
    axios
      .get("/allpost")
      .then((req) => {
        //  console.log(req.data);
        setdata(req.data.posts);
        setOldData(req.data.posts);
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

  useEffect(() => {
    if (search) {
      // console.log('hsear', search)
      const newData = data.filter((item) => {
        return item.title.toLowerCase().includes(search);
      });

      setdata(newData);
    } else {
      setdata(oldData);
    }
  }, [search]);

  return (
    <div>
      <div className="seachitem">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          type="text"
          placeholder="Search Item Here"
        ></input>
        <SearchIcon />
      </div>
      <div className="homecard">
        <CardPost datafrom={data} showComment={false} />
      </div>
    </div>
  );
}

export default Home;
