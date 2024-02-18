import CreateIssue from "@/components/CreateIssue";
import { Options } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(Options);
  if (!session?.user) {
    return redirect("/");
  }

  return <CreateIssue />;
};

export default page;
