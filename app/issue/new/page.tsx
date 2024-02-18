import { Options } from "@/app/api/auth/[...nextauth]/route";
import CreateIssue from "@/components/CreateIssue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const page = async () => {
  const session = await getServerSession(Options);
  if (!session?.user) {
    return redirect("/");
  }

  return <CreateIssue />;
};

export default page;
