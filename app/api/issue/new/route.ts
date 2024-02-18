import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().max(200),
});

export async function POST(request: NextRequest) {
 try {
   const body = await request.json();
  const isValid = schema.safeParse(body); 

  if (isValid.success) {
    const newIssue = await prisma?.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    if (newIssue) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } 
 } catch (error) {
  return NextResponse.json({messgae:error}, {status: 400})
 }
}
