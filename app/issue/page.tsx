import { Button } from "@/components/ui/button";
import Link from "next/link";
import IssueTypes from "@/components/IssueTypes";
import React from "react";
import prisma from "@/prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = async () => {
  const data = await prisma?.issue.findMany();
  return (
    <div className="w-[90%] m-auto flex flex-col gap-y-6">
      <div className="w-full mt-4 flex justify-between items-center m-auto">
        <IssueTypes />
        <Button>
          <Link href={"/issue/new"}>New Issue</Link>
        </Button>
      </div>
      <Table className=" border rounded-lg lg:mx-0">
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3">Issue</TableHead>
            <TableHead>
              <div className="text-center">Status</div>
            </TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((Issue, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Link href={`/issue/${Issue.id}`}>{Issue.title}</Link>
              </TableCell>
              <TableCell>
                <div
                  className={`w-fit m-auto rounded-md px-2 py-1 text-xs whitespace-nowrap ${
                    Issue.status === "completed"
                      ? "bg-red-100  text-red-600"
                      : null
                  } ${
                    Issue.status === "pending"
                      ? "bg-green-100  text-green-600"
                      : null
                  }  ${
                    Issue.status === "open"
                      ? "bg-purple-100  text-purple-600"
                      : null
                  } null`}
                >
                  {Issue.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {Issue?.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
