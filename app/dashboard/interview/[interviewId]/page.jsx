"use client"
import React, { useEffect, useState } from 'react'
import { use } from "react";
import { db } from '@/utils/db';
import { eq } from "drizzle-orm";
import { MockInterview } from '@/utils/schema';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function Interview({ params }) {
    const unwrappedParams = use(params); // ✅ unwrap promise
    const interviewId = unwrappedParams?.interviewId;
  
    const [interviewData, setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState(false);

    useEffect(() => {
      console.log("Interview ID:", interviewId);
      GetInterviewDetails();
    }, [interviewId]);
  
    /* used to get interview details by mockid/interviewid */

    const GetInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));
  
        setInterviewData(result[0]);

      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };
  
    return (
        <div className='my-10 flex flex-col justify-center items-center'>
            <h2 className='font-bold text-2xl text-center'>Let's Get Started</h2>
            <div className ='grid grid-cols-1 md:grid-cols-2 gap-10 '>
            {interviewData && (
  <div className='flex flex-col my-7 gap-5'>
    <div className='flex flex-col p-5 rounded-lg border gap-5'>
      <h2 className='text-lg'>
        <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
      </h2>
      <h2 className='text-lg'>
        <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
      </h2>
      <h2 className='text-lg'>
        <strong>Years of Experience:</strong> {interviewData.jobExperience}
      </h2>
    </div>
  </div>
)}

            <div className ="flex flex-col items-center">
                {webCamEnabled?<Webcam
                onUserMedia={()=>setWebCamEnabled(true)}
                onUserMediaError={()=>setWebCamEnabled(false)}
                mirrored={true}
                style={{
                    height:500,
                    width:500
                }}
                />
                :
                < >
                <WebcamIcon className='h-72 w-100 my-7 p-20 bg-secondary rounded-lg border justify-center' />
                <Button variant="ghost" className="w-full font-bold hover:bg-gray-100"  onClick={()=> setWebCamEnabled(true)}>Enable Web cam and Microphone </Button>
                </>
                }
            </div>
            
            </div>
            <div className='w-2 flex justify-end mt-8'>
                <Link href={'/dashboard/interview/'+interviewId+'/start'}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">Start Interview</Button>
                </Link>
            </div>
           
           
        </div>
    )
  }
  

export default Interview;
