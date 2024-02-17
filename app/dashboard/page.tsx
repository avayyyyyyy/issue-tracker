import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { Options } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const tasks = await prisma?.issue.findMany({
    select: {
      status: true,
    },
  });

  const session = await getServerSession(Options);
  if (!session?.user) {
    return redirect("/");
  }

  const open = tasks?.filter((e) => e.status === "open");
  const completed = tasks?.filter((e) => e.status === "completed");
  const pending = tasks?.filter((e) => e.status === "pending");

  return (
    <div className="w-[90%] m-auto mt-7 flex flex-col gap-y-6">
      <div>
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-2 p-3 border rounded-lg text-left">
            <h1 className="font-semibold">Open Issues</h1>
            <h1 className="text-sm">{open!.length < 1 ? "0" : open?.length}</h1>
          </div>
          <div className="flex flex-col gap-y-2 p-3 border rounded-lg text-left">
            <h1 className="font-semibold">In-progress Issues</h1>
            <h1 className="text-sm">
              {pending!.length < 1 ? "0" : pending?.length}
            </h1>
          </div>
          <div className="flex flex-col p-3 gap-y-2 border rounded-lg text-left">
            <h1 className="font-semibold">Closed Issues</h1>
            <h1 className="text-sm">
              {completed!.length < 1 ? "0" : completed?.length}
            </h1>
          </div>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}
