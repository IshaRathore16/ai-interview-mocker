"use client";

import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from "@/components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from "sonner"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatSession } from '@google/generative-ai';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';



function RecordAnSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading,setLoading]= useState(false);
  const {user}=useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });



  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser does not support Speech Recognition");
    }
  }, []);

  useEffect(() => {
    if (results && results.length > 0) {
      const newTranscript = results.map((r) => r.transcript).join(' ');
      setUserAnswer(newTranscript);
    }
  }, [results]);

  useEffect(()=>{
    if(!isRecording&&userAnswer.length>10){
        UpdateUserAnswer();
    }
  },[userAnswer])

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY); 

 const StartStopRecording= async()=>{
  if(isRecording){
    stopSpeechToText();
   
  }else{
    startSpeechToText();
  }
 }

 const UpdateUserAnswer= async ()=>{
  setLoading(true);
  const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question
  +", User Answer:"+userAnswer+", Depends on questions and user answer for give interview question"+
  " please give us rating for answer and feedback as area of improvement if any "+
  "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field "

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Valid for v1
    const result = await model.generateContent(feedbackPrompt);
    const response = await result.response.text();
    const cleaned = response.replace(/```json|```/g, "");

    console.log("AI Feedback:", cleaned);
    const JsonFeedbackResp=JSON.parse(cleaned);

    const resp=await db.insert(UserAnswer)
    .values({
      mockIdRef:interviewData?.mockId,
      question:mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns:userAnswer,
      feedback:JsonFeedbackResp?.feedback,
      rating:JsonFeedbackResp?.rating,
      userEmail:user?.primaryEmailAddress.emailAddress,
      createdAt:moment().format('DD-MM-yyyy')

    })
    if(resp){
      toast('User Answer recorded successfully')
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);
   
    setLoading(false);


  } catch (err) {
    console.error("Error during AI feedback:", err);
    toast.error("Failed to get AI feedback");
  }
 }

  return (
    <div className='flex flex-col justify-center text-center'>
      <div className='flex flex-col mt-20 justify-center items-center rounded-lg p-5 bg-black'>
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      <div className='flex flex-col justify-center text-center'>
        <Button
          disabled={loading}
          variant="outline"
          className='my-10'
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <h2 className='text-red-600 flex gap-2 items-center'>
              <Mic /> Stop Recording
            </h2>
          ) : (
            <span className='flex gap-2 items-center'>
              <Mic /> Record Answer
            </span>
          )}
        </Button>

      </div>
    </div>
  );
}

export default RecordAnSection;
