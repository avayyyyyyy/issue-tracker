import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type props = {
  params: { id: string };
};

export async function POST(request: NextRequest, { params }: props) {
  const { id } = params;

  const deleted = await prisma.issue.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  if (deleted) {
    return NextResponse.json(
      {
        success: true,
        msg: "Deleted Successful",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      msg: "Deleted Failed",
    },
    { status: 400 }
  );
}
