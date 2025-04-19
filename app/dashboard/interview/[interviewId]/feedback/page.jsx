"use client";

import React, { useEffect, useState } from 'react';
import { ChevronsUpDown } from "lucide-react";
import { Button } from '@/components/ui/button';
import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { useParams, useRouter } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UserAnswer } from '@/utils/schema';

function Feedback() {
  const router = useRouter();
  const params = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const interviewId = params?.interviewId;

    if (!interviewId) {
      console.error("Interview ID not found in params.");
      setLoading(false);
      return;
    }

    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-10'>
      {loading ? (
        <h2 className='text-xl text-gray-500'>Loading feedback...</h2>
      ) : feedbackList.length === 0 ? (
        <h2 className='font-bold text-xl text-gray-500'>No Interview Record found</h2>
      ) : (
        <>
          <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
          <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
          <h2 className='text-lg my-5 text-blue-700'>
            Your overall interview rating
          </h2>
          <h2 className='text-sm text-grey-500 mb-4'>
            Find below interview questions with correct answers, your answers, and feedback for improvement
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
              <CollapsibleTrigger className='p-2 rounded-lg bg-gray-200 m-2 text-left flex justify-between gap-7 w-full'>
                {item.question} <ChevronsUpDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-red-500 p-2 border rounded-lg'>
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                    <strong>Your Answer:</strong> {item.userAns}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                    <strong>Correct Answer:</strong> {item.correctAns}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'>
                    <strong>Feedback:</strong> {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      {!loading && (
        <Button
          onClick={() => router.replace('/dashboard')}
          className='text-white bg-blue-700 hover:bg-blue-900 mt-3'
        >
          Go Home
        </Button>
      )}
    </div>
  );
}

export default Feedback;
