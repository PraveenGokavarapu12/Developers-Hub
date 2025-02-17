import React, { useEffect, useState } from "react";
import axios from "axios";

const LikedPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3005/api/users/likedposts", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setData(res.data.likedPosts);
        console.log(res.data);
      } catch (err) {
        alert(err);
      }
    };

    fetchLikedPosts();
  }, []);

 
  return (
    <div className="flex flex-col justify-start items-center pt-12 p-4 w-full mt-15 bg-gradient-to-r from-[#090610] to-[#251841] text-slate-300 min-h-screen">
      {data.length !== 0 ? (
        <div className="m-2 p-2 rounded-lg w-full md:w-3/4">
          <h1 className="text-xl font-bold text-blue-300 m-2 self-left">Liked Posts</h1>
          {data.map((post) => (
            <div key={post._id}>
              {/* Post Content */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />

              <hr className="border-t-2 border-blue-300 my-6 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <p>No posts yet</p>

        </div>
        
      )}
    </div>
  );
};

export default LikedPosts;
