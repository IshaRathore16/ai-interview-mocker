import React from 'react'
import { Lightbulb, Volume2 } from 'lucide-react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex}) {
  
    const textToSpeach=(text)=>{
        if('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }
        else{
            alert('Sorry, Youw browser does not support text to speech');
        }
    }

    return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2 key={index} className={`p-2  rounded-full
           text-xs md:text-sm text-center cursor-pointer
           ${activeQuestionIndex==index && 'text-white  bg-blue-700'}`}>
            Question #{index + 1}
          </h2>
        ))}
      </div>
      {mockInterviewQuestion && mockInterviewQuestion.length > 0 && (
  <h2 className='my-5 text-md md:text-lg'>
    {mockInterviewQuestion[activeQuestionIndex]?.question}
  </h2>
)}
<Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>


      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-700'>
            <Lightbulb />
            <strong>Note:</strong>
          
        </h2>
        <h2 className='text-sm text-blue-700 my-4'>Click on Record Answer when you want to answer the 
                question. At the end of interview we will give you
                the feedback along with corrected answer for each of
                question and your answer to compare it
            </h2>
      </div>

    </div>
  )
}

export default QuestionSection
