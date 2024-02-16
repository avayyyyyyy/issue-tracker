"use client";
import React from "react";
import prisma from "@/prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePenLine, FileX } from "lucide-react";
import AssignedToUser from "@/components/AssignedToUsers";
import Link from "next/link";
import { revalidatePath } from "next/cache";

type props = {
  params: { id: string };
};

interface User {
  name: string | null;
}

const page = async ({ params: { id } }: props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const Users: User[] = await prisma.user.findMany({
    select: {
      name: true,
    },
  });

  return (
    <div className="w-[90%] m-auto mt-7 flex gap-3  gap-y-6">
      <div className="flex flex-col gap-y-4 w-[90%] ">
        <div>
          <h1 className="text-3xl font-bold">{issue?.title}</h1>
        </div>
        <div className="flex gap-x-4">
          <div
            className={`w-fit rounded-md px-2 py-1 text-xs whitespace-nowrap ${
              issue?.status === "completed" ? "bg-red-100  text-red-600" : null
            } ${
              issue?.status === "pending"
                ? "bg-green-100  text-green-600"
                : null
            }  ${
              issue?.status === "open" ? "bg-purple-100  text-purple-600" : null
            } null`}
          >
            {issue?.status}
          </div>
          <div>{issue?.createdAt.toDateString()}</div>
        </div>
        <Textarea
          placeholder="Type your message here."
          value={issue?.description}
          disabled
        />
      </div>
      <div className="w-[20%] p-2 m-auto gap-y-5 flex flex-col">
        <div>
          <AssignedToUser users={Users} id={issue} />
        </div>
        <Button variant={"outline"}>
          <Link className="flex gap-x-2" href={`/issue/edit/${id}`}>
            <FilePenLine size={18} /> Edit Issue
          </Link>
        </Button>
        <Button variant={"destructive"}>
          {" "}
          <Link className="flex gap-x-2" href={`/api/delete/${id}`}>
            <FileX size={18} />
            Delete Issue
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
