import React from "react";
import prisma from "@/prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { Options } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DeleteIssueButton from "@/components/DeleteButton";

type props = {
  params: { id: string };
};

const page = async ({ params: { id } }: props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      createdBy: true,
      createdAt: true,
      title: true,
      description: true,
      status: true,
    },
  });

  const session = await getServerSession(Options);
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="w-[90%] m-auto mt-7 flex gap-3  gap-y-6">
      <div className="flex flex-col gap-y-4 w-[80%] ">
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
          <div>
            <h1>{issue?.createdAt.toDateString()}</h1>
          </div>
        </div>
        <Textarea
          className=""
          placeholder="Type your message here."
          value={issue?.description}
          disabled
        />
      </div>
      <div className="lg:w-[20%] p-2 m-auto gap-y-5 flex flex-col">
        <div className="">{issue?.createdBy?.name}</div>

        <Link className="flex gap-x-2" href={`/issue/edit/${id}`}>
          <Button variant={"outline"} className="w-full">
            <FilePenLine size={18} /> Edit Issue
          </Button>
        </Link>
        <DeleteIssueButton issueId={parseInt(id)} />
      </div>
    </div>
  );
};

export default page;
