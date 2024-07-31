'use client';
import React from 'react'

const Page = () => {
    getData().then((res) => console.log(res));
  return (
    <div>Hello worlds2
        
    </div>
  )
}
const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/post", {
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Failed to get tix: ", error);
    }
  };
export default Page;