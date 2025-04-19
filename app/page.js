"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-blue-100">
      {/* Left Side (Text) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-6 md:p-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          AI INTERVIEW MOCKER
        </h1>
        <p className="text-base md:text-xl mt-5 max-w-xl">
          AI Interview Mocker is a smart web application designed to simulate real-world technical interviews using the power of AI. This platform helps candidates prepare confidently by providing personalized interview experiences based on their selected domain and difficulty level.
          The front-end is clean, responsive, and intuitive—built for a seamless user experience.
        </p>
        <Link href="/dashboard" className="mt-7">
          <Button className="w-40 text-white bg-blue-700 hover:bg-blue-800">
            Start
          </Button>
        </Link>
      </div>

      {/* Right Side (Image) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Image
          src="/imgMock.jpg"
          alt="AI Mock Interview"
          width={600}
          height={600}
          className="rounded-xl shadow-md w-full max-w-lg h-auto"
        />
      </div>
    </div>
  );
}
