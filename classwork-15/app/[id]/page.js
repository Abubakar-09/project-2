"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [apiData, setApiData] = useState(null);
  const param = useParams().id

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${param}`);
      const data = await response.json();
      setApiData(data);
    };
    fetchData();
  }, [param]);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {/* Render fetched data */}
      {apiData ? (
        <>
        <div className="w-[70vw] max-md:w-[80vw] flex flex-col justify-around  cursor-pointer h-[55vh] overflow-y-scroll overflow-x-hidden p-2 border-[1px] border-black rounded-xl">
              <div>id: {apiData.id}</div>
              <div>title: {apiData.title}</div>
              <div>Body: {apiData.body}</div>
            </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
