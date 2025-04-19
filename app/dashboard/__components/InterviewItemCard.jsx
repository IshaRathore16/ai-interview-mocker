import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function InterviewItemCard({interview}) {
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-blue-700'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years of Experience</h2>
      <h2 className='text-xs text-gray-400'>Created At {interview?.createdAt}</h2>
      <div className='flex justify-between mt-2 gap-5'>
        <Link href={'/dashboard/interview/'+interview.mockId+'/feedback'}>
        <Button className=' size-sm' variant='outline'>Feedback</Button>
        </Link>
        <Link href={'/dashboard/interview/'+interview.mockId}>
        <Button className='text-white size-sm bg-blue-700 hover:bg-blue-800'>Start</Button>
        </Link>
      </div>
    </div>

  )
}

export default InterviewItemCard
