"use client";
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
import { db } from "../../../utils/db";
import { getChatSession } from "../../../utils/GeminiAIModal";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { responseCookiesToRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { useRouter } from 'next/navigation';


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading]= useState(false);
  const [jsonResponse,setJsonResponse]= useState([]);
  const {user}=useUser();
  const router= useRouter();

  const onSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form Submitted!");
    console.log({ jobPosition, jobDesc, jobExperience });

    // Reset
    setJobPosition("");
    setJobDesc("");
    setJobExperience("");
    const InputPrompt = "Job position: " + jobPosition + 
    ", Job Description: " + jobDesc + 
    ", Years of Experience: " + jobExperience + 
    ". Based on the job position, job description, and years of experience, give "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +" interview questions along with their answers in JSON format. Each item should have a 'question' and an 'answer' field.";
    let resp="";
    try {
      const chatSession = await getChatSession(); // ✅ get fresh session
      const result = await chatSession.sendMessage(InputPrompt);
      const response = await result.response;
      const MockJsonResp= await (result.response.text()).replace('```json','').replace('```','');
      
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(MockJsonResp);
      if(MockJsonResp){
       resp= await db.insert(MockInterview).values(
        {
          mockId:uuidv4(),
          jsonMockResp:MockJsonResp,
          jobPosition:jobPosition,
          jobDesc:jobDesc,
          jobExperience:jobExperience,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')

        }
      ).returning({mockId:MockInterview.mockId})
      console.log("Inserted ID: ",resp);
    }
    } catch (error) {
      console.error("Error generating questions:", error);
    }
    
    setLoading(false);
    // Close Dialog
    if(resp){
    setOpenDialog(false);
    router.push('/dashboard/interview/'+resp[0].mockId);
    }
  };
 


  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary 
        hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <div>
              <h2 className="mb-4">
                Add details about your job description, job position/role and years of experience
              </h2>
              <div className="mt-2 my-2">
                <label htmlFor="jobPosition">Job Role/Job Position</label>
                <Input
                  id="jobPosition"
                  value={jobPosition}
                  required
                  placeholder="Ex. Full Stack Developer"
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label htmlFor="jobDesc">Job Description/ Tech Stack</label>
                <Textarea
                  id="jobDesc"
                  required
                  placeholder="Ex. React, Nodejs, MySQL"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label htmlFor="jobExperience">Years of Experience</label>
                <Input
                  id="jobExperience"
                  type="number"
                  required
                  placeholder="Ex. 5"
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-5 justify-end mt-4">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
              {loading?
              <>
              <LoaderCircle className="animate-spin" />Generating from AI
              </>:"Start Interview"
              }
                
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
