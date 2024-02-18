import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Options } from "@/utils/authOptions";

export default async function Home() {
  let tasks;
  try {
    tasks = await prisma?.issue.findMany({
      select: {
        status: true,
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }

  const session = await getServerSession(Options);
  if (!session?.user) {
    return redirect("/");
  }

  const open = tasks?.filter((e) => e.status === "open") || [];
  const closed = tasks?.filter((e) => e.status === "completed") || [];
  const pending = tasks?.filter((e) => e.status === "pending") || [];

  return (
    <section className="bg-primary-foreground h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Trusted by 100&apos;s of Businesses
          </h2>

          <p className="mt-4 text-primary/40 sm:text-xl">
            Empower your team with our Issue Tracker, a user-friendly platform
            designed to centralize and monitor project challenges. Seamlessly
            track tasks, assign responsibilities, and enhance collaboration,
            ensuring a smoother project management experience with timely issue
            resolution.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-primary/30 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-primary/40">
                Open Issue
              </dt>

              <dd className="text-4xl font-extrabold text-primary md:text-5xl">
                {open.length}
              </dd>
            </div>
            <div className="flex flex-col rounded-lg border border-primary/30 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-primary/40">
                Pending Issues
              </dt>

              <dd className="text-4xl font-extrabold text-primary md:text-5xl">
                {pending.length}
              </dd>
            </div>
            <div className="flex flex-col rounded-lg border border-primary/30 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-primary/40">
                Closed Issue
              </dt>

              <dd className="text-4xl font-extrabold text-primary md:text-5xl">
                {closed.length}
              </dd>
            </div>
          </dl>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Link href={"/issue/new"}>
            <Button className="">Create Issue</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
