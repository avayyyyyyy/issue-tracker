import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { Options } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ChangeStatus } from "@/components/ChangeStatus";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const UpdateIssue = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const desc = formData.get("description");
    const status = formData.get("status");



    if (!title || !desc) {
      return null;
    }

    const updated = await prisma?.issue.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: String(title),
        description: String(desc),
        status: status ?? issue?.status,
      },
    });

    if (updated) {
      return redirect("/issue");
    }
    return null;
  };

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const session = await getServerSession(Options);
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="w-[90%] lg:max-w-xl mt-20  gap-y-4 flex flex-col m-auto">
      <h1 className="font-bold text-2xl lg:text-4xl text-center">
        Update Issue 👇🏻
      </h1>
      <form action={UpdateIssue}>
        <Label htmlFor="title">Title:</Label>
        <div className=" flex gap-2">
          <Input
            className="dark:bg-black/45"
            type="title"
            name="title"
            defaultValue={issue?.title}
            placeholder="Title "
          />

          <select
            name="status"
            id=""
            defaultValue={issue?.status}
            className="bg-primary-foreground border  outline-none py-1 px-1 rounded-lg"
          >
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <Label htmlFor="description">Description:</Label>
        <Textarea
          className="dark:bg-black/45"
          defaultValue={issue?.description}
          name="description"
          rows={15}
          placeholder="Type your message here."
        />
        <Button className="w-full mt-4" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default page;
