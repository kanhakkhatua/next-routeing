import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function post() {
  const [userData, setUserData] = useState({});
  const [postData, setpostData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getUserData();
      getPostData();
    }
  }, [router.isReady]);
  let userId = router.query.postId;

  const getUserData = async () => {
    let userId = router.query.postId;

    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUserData(res.data[userId]);
      });
  };

  const getPostData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setpostData(res.data);
      });
  };

  const filterData = postData.filter((e) => e.userId === userData.id);
  // console.log(filterData);

  return (
    <>
      <div>
        <div className="flex justify-center items-center ">
          <div className="card ">
            <div>
              <div className=" font-medium text-gray-900 ">
                Name :{" "}
                <span className=" font-light  mx-2">{userData.name}</span>{" "}
              </div>
            </div>
            <div>
              <div className="float-left font-medium text-gray-900">
                User Name :
                <span className=" font-light mx-2">{userData.username}</span>
              </div>
            </div>
            <div>
              <div className="float-left font-medium text-gray-900">
                Phone :
                <span className=" font-light  mx-2">{userData.phone}</span>
              </div>
            </div>
            <div>
              <div className="float-left font-medium text-gray-900">
                Email :
                <span className=" font-light mx-2">{userData.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table  */}
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                User Name
              </th> */}
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Body
                </th>
                <th scope="col" className="px-6 py-3">
                  Comments
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
                    {/* <td className="px-6 py-4">{userData.username}</td> */}
                    <td className="px-6 py-4">{ele.title}</td>
                    <td className="px-6 py-4">{ele.body}</td>
                    <td className="px-6 py-4  ">
                      <Link
                        href={{
                          pathname: `/comments/${i}`,
                          query: {
                            id: userId,
                          },
                        }}
                      >
                        <button className="hover:underline">
                          View Comments
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default post;
