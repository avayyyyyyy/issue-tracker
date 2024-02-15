import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import prisma from "@/prisma/client";

const schema = z.object({
    title: z.string().min(3).max(255),
    description:z.string().min(1)
});

export async function POST(request: NextRequest){
   try {
     const body = await request.json()
    const isValid = schema.safeParse(body)
    if(!isValid.success)return NextResponse.json({message:"Wrong Body Sent"})
    const issue = await prisma?.issue.create({
       data:{
        title: isValid.data.title,
        description: isValid.data.description
       }
    })
    return NextResponse.json({data:issue},{status:201})
   } catch (error) {
    return NextResponse.json({err:error},{status:404})
   }
}