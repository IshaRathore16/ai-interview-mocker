"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';

function Header() {

    const router = useRouter();
    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    })

  return (
    <div className='flex p-4 items-center justify-between bg-scondary shadow-sm'>
      <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
      <ul className='hidden md:flex gap-6'>
        <Link href={'/dashboard'}>
        <li className={`text-blue-600 hover:bg-blue-700 hover:text-white
         transition-none cursor-pointer 
         ${path=='/dashboard' && 'text-blue-950' && 'font-bold'}`}>Dashboard</li>
         </Link>
        <li className={`text-blue-600 hover:bg-blue-700 hover:text-white
         transition-none cursor-pointer 
         ${path=='/dashboard/questions' && 'text-blue-950'
          && 'font-bold'}`}>Questions</li>
         
        <li onClick={() => router.replace('/dashboard/upgrade')} className={`text-blue-600 hover:bg-blue-700 hover:text-white
         transition-none cursor-pointer 
         ${path=='/dashboard/upgrade' && 'text-blue-950'
          && 'font-bold'}`}>Upgrade</li>
          
          <li className={`text-blue-600 hover:bg-blue-700 hover:text-white
         transition-none cursor-pointer 
         ${path=='/dashboard/how' && 'text-blue-950'
          && 'font-bold'}`}>How it Works</li>
        
      </ul>
      <UserButton />
    </div>
  )
}

export default Header
