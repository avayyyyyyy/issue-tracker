import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().max(200),
});

export async function POST(request: NextRequest) {

  let dummy = []

 try {
   const body = await request.json();
  const isValid = schema.safeParse(body); 
  dummy.push("1")
  if (isValid.success) {
    dummy.push("isValidated")
    const newIssue = await prisma?.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    dummy.push("after new issue")
    if (newIssue) {
      dummy.push("new issue")
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } 
 } catch (error) {
  return NextResponse.json({messgae:dummy}, {status: 400})
 }
}
