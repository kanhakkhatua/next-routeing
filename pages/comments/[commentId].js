import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function commentId() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [postData, setpostData] = useState({});
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      getPostData();
      getCommentData();
      getUserData();
    }
  }, [router.isReady]);

  const getUserData = async () => {
    // console.log("here is the data===>>", router.query.id);
    let userId = router.query.id;

    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // console.log(res.data[userId]);
        setUserData(res.data[userId]);
      });
  };

  const getPostData = async () => {
    let cmtId = router.query.commentId;
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        // console.log(res.data[cmtId]);
        setpostData(res.data[cmtId]);
      });
  };

  const getCommentData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        // console.log(res.data);
        setCommentData(res.data);
      });
  };

  const filterData = commentData.filter((e) => e.postId === postData.id);
  //   console.log(filterData);

  return (
    <>
      <div>
        <div className="flex justify-center items-center ">
          <div className="card ">
            <div>
              <div className=" font-medium text-gray-900 ">
                Name :<span className=" font-light  mx-2">{userData.name}</span>
              </div>
            </div>
            <div>
              <div className=" font-medium text-gray-900 ">
                User Name :
                <span className=" font-light  mx-2">{userData.username}</span>
              </div>
            </div>
            <div>
              <div className=" font-medium text-gray-900 ">
                Phone :
                <span className=" font-light  mx-2">{userData.phone}</span>
              </div>
            </div>
            <div>
              <div className=" font-medium text-gray-900 ">
                Email :
                <span className=" font-light  mx-2">{userData.email}</span>
              </div>
            </div>

            <div>
              <div className=" font-medium text-gray-900 ">
                Post Name :
                <span className=" font-light  mx-2">{postData.title}</span>
              </div>
            </div>
            <div>
              <div className="float-left font-medium text-gray-900">
                Post Content :
                <span className=" font-light mx-2">{postData.body}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Table  */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Comment Name
              </th>

              <th scope="col" className="px-6 py-3">
                Comments Body
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((ele, i) => {
              return (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{ele.name}</td>
                  <td className="px-6 py-4">{ele.body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default commentId;
