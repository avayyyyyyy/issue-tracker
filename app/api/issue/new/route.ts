import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

  const sechema = z.object({
    title : z.string().min(3),
    description : z.string().max(200) 
  })
  

export async function POST(request: NextRequest) {
  const body = await request.json();
  const isValid = sechema.safeParse(body)
  if(isValid){
    const newIssue = await prisma?.issue.create({
      data:{
        title: body.title,
        description: body.description
      }
      })

      if(newIssue){
        return NextResponse.json({success: true}, {status: 200})
      } 

      return null;


  } else{

  }



}
