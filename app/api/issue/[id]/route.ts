import  prisma  from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

type params = {
    params : {id : string}
}

export async function DELETE(request: NextRequest, {params} : params){
   const {id} = params
   const deleted = await prisma?.issue.delete({
    where:{
        id:parseInt(id)
    }
   })
if(deleted){
    return NextResponse.json({success: true,},{status: 200})
} else {
    null
}


   
}