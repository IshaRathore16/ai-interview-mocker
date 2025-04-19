'use client'; // ✅ This is required for using useState, useEffect, and hooks

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { use } from "react";
import { MockInterview } from '@/utils/schema';
import QuestionSection from './_components/QuestionSection';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// ✅ Prevent SSR for component that uses `window`, mic, or other browser APIs
const RecordAnsSection = dynamic(
  () => import('./_components/RecordAnSection'),
  { ssr: false }
);

function StartInterview({ params }) {
  const unwrappedParams = use(params); // ✅ unwrap promise
    const interviewId = unwrappedParams?.interviewId;
    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
        useEffect(() => {
          console.log("Interview ID:", interviewId);
          GetInterviewDetails();
        }, [interviewId]);
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log(jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video and audio recording */}
        <RecordAnsSection 
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end gap-6'>  
        {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} className='text-white bg-blue-700 hover:bg-blue-900'> Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&<Button onClick={ ()=>setActiveQuestionIndex(activeQuestionIndex+1)} className='text-white bg-blue-700  hover:bg-blue-900'>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1&&
        <Link href={'/dashboard/interview/'+interviewData.mockId+'/feedback'}>
        <Button className='text-white bg-blue-700  hover:bg-blue-900'>End Interview</Button>
        </Link>}
      </div>
    </div>
  );
}

export default StartInterview;
