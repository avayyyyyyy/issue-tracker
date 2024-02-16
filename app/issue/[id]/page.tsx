import React from "react";
import prisma from "@/prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePenLine, FileX } from "lucide-react";
import AssignedToUser from "@/components/AssignedToUsers";

type props = {
  params: { id: String };
};

const page = async ({ params: { id } }: props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const Users = await prisma.user.findMany({
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
        <Button variant={"outline"} className="flex gap-x-2">
          <FilePenLine size={18} /> Edit Issue
        </Button>
        <Button variant={"destructive"} className="flex gap-x-2">
          {" "}
          <FileX size={18} />
          Delete Issue
        </Button>
      </div>
    </div>
  );
};

export default page;
