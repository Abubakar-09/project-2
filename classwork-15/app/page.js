"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setApiData(data);
      console.log(data)
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-2 py-10 flex-wrap md:gap-y-8 justify-center items-center">

        {apiData.map((e) => (
          <Link key={e.id} href={`/${e.id}`}>
            <div className="w-[20vw] max-md:w-[80vw] hover:scale-110 cursor-pointer h-[55vh] overflow-y-scroll overflow-x-hidden p-2 border-[1px] border-black rounded-xl">
              <div>user id: {e.userId}</div>
              <div>id: {e.id}</div>
              <div>title: {e.title}</div>
              <div>Body: {e.body}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}