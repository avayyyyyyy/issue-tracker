import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

type props = {
  params: { id: string };
};

export async function DELETE(request: NextRequest, { params }: props) {
  try {
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
    } else {
      return NextResponse.json(
        {
          success: false,
          msg: "Deleted Failed",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Deleted Failed",
      },
      { status: 400 }
    );
  }
}
