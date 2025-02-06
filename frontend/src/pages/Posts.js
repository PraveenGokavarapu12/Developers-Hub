import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  FaTrash,
  FaUser,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const MyPosts = () => {
  const [data, setData] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [dislikedPosts, setDislikedPosts] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://lancer-app-praveen.onrender.com/api/posts", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Toggle Like
  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newState = { ...prev, [postId]: !prev[postId] };
      if (newState[postId]) {
        setDislikedPosts((prev) => ({ ...prev, [postId]: false })); // Remove dislike if liked
      }
      return newState;
    });
  };

  // Toggle Dislike
  const toggleDislike = (postId) => {
    setDislikedPosts((prev) => {
      const newState = { ...prev, [postId]: !prev[postId] };
      if (newState[postId]) {
        setLikedPosts((prev) => ({ ...prev, [postId]: false })); // Remove like if disliked
      }
      return newState;
    });
  };

  return (
    <div className="flex flex-col justify-start items-center p-4 min-w-full mt-16">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="loader text-lg text-blue-600">Loading... Just a Sec!</div>
        </div>
      ) : data.length !== 0 ? (
        <div className="m-2 p-2 rounded-lg w-3/4">
          {data.map((post) => (
            <div key={post._id}>
              {/* User Info */}
              <div className="flex items-center">
                <FaUser className="text-3xl sm:text-5xl text-slate-500 bg-slate-100 p-3 rounded-full ml-5 m-5" />
                <div className="mx-2 font-bold text-blue-900 w-full md:w-2/6 p-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <h1 className="text-center md:text-left">{post.user_id.name}</h1>
                    <MdVerified />
                  </div>
                  <h2 className="font-normal">{post.user_id.email}</h2>
                </div>
              </div>

              {/* Post Content */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Time Ago */}
              <p className="text-gray-500 text-sm">{moment(post.createdAt).fromNow()}</p>

              {/* Like & Dislike Buttons */}
              <div className="flex space-x-3">
                <button onClick={() => toggleLike(post._id)}>
                  {likedPosts[post._id] ? (
                    <FaThumbsUp className="m-2 text-blue-500 cursor-pointer" />
                  ) : (
                    <FaRegThumbsUp className="m-2 text-blue-500 cursor-pointer" />
                  )}
                </button>

                <button onClick={() => toggleDislike(post._id)}>
                  {dislikedPosts[post._id] ? (
                    <FaThumbsDown className="m-2 text-blue-500 cursor-pointer" />
                  ) : (
                    <FaRegThumbsDown className="m-2 text-blue-500 cursor-pointer" />
                  )}
                </button>
              </div>

              <hr className="border-t-2 border-blue-500 my-6 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
};

export default MyPosts;
