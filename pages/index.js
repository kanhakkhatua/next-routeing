import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [userData, setuserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // console.log(userData);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      // console.log(res.data);
      let userData = JSON.parse(localStorage.getItem("userData"));

      if (!userData || userData.length === 0) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        setuserData(res.data);
      } else {
        setuserData(userData);
      }
    });
  }, []);

  function handleSubmit() {
    // localStorage.setItem("userData", JSON.stringify());
    setShowModal(false);
  }
  function dataSend(e, i) {
    console.log("i");
  }
  function setLocalData(e, i) {
    console.log(i);
  }

  return (
    <>
      <button
        className="bg-slate-400 hover:bg-slate-100 mx-2 my-2 rounded-lg h-9 w-36"
        onClick={() => setShowModal(true)}
      >
        + Create User
      </button>
      {/* Table  */}
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  PHone
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((ele, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {ele.id}
                    </th>
                    <Link href={`/${i}`}>
                      <th
                        onClick={(e, i) => setLocalData(e, i)}
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap cursor-pointer "
                      >
                        {ele.name}
                      </th>
                    </Link>
                    <td className="px-6 py-4">{ele.username}</td>
                    <td className="px-6 py-4">{ele.email}</td>
                    <td className="px-6 py-4">{ele.phone}</td>

                    <td className="px-6 py-4 ">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal  */}
      <div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h4 className="text-3xl font-semibold">Enter User Data</h4>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" text-black hover: bg-slate-200 ">
                        X
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div>
                      <span className="font-medium">Name : </span>
                      <input
                        type="text"
                        className="bg-slate-100 rounded-lg h-8 w-64 "
                      />
                    </div>
                    <div className="my-1 ">
                      <span className="font-medium">User Name : </span>
                      <input
                        type="text"
                        className=" bg-slate-100  rounded-lg h-8 w-64"
                      />
                    </div>
                    <div className="my-1">
                      <span className="font-medium">Email : </span>
                      <input
                        type="text"
                        className="bg-slate-100 rounded-lg h-8 w-64 "
                      />
                    </div>
                    <div className="my-1">
                      <span className="font-medium">Phone : </span>
                      <input
                        type="text"
                        className="bg-slate-100 rounded-lg h-8 w-64 "
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
}
