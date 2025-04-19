"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-blue-100 flex">
      {/* Left Side (Text) */}
      {/* Left Side (Text) */}
<div className="w-1/2 flex flex-col text-center justify-start mt-30 p-7">
  <h1 className="text-5xl font-extrabold text-blue-900">
    AI INTERVIEW MOCKER
  </h1>
  <div className="text-xl mt-5">
    AI Interview Mocker is a smart web application designed to simulate real-world technical interviews using the power of AI. This platform helps candidates prepare confidently by providing personalized interview experiences based on their selected domain and difficulty level. 
    The front-end is clean, responsive, and intuitive—built for a seamless user experience.
  </div>
  <Link href="/dashboard">
  <div className="flex justify-center">
  <Button className=" text-center text-white bg-blue-700 hover:bg-blue-800 mt-7 w-30 ">
    Start
  </Button>
  </div>
  </Link>
</div>


      {/* Right Side (Image) */}
      <div className="w-1/2 flex items-start justify-center mt-25 p-7">
        <Image
          src="/imgMock.jpg"
          alt="AI Mock Interview"
          width={1200}
          height={1200}
          className="rounded-xl shadow-md"
        />
      </div>
    </div>
  );
}