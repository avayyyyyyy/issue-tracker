import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Options } from "@/utils/authOptions";

const Page = async () => {
  const session = await getServerSession(Options);
  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <>
      <section className="">
        <div className="mx-auto mt-40 lg:mt-0 h-screen max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto min-w-xl text-center">
            <h1 className="text-3xl mb-4 font-extrabold sm:text-5xl">
              Simplify project tasks with
              <div className="font-extrabold px-2 w-fit mx-auto bg-primary text-primary-foreground sm:block">
                {" "}
                precision.{" "}
              </div>
            </h1>
            <p className="mt-4 max-w-md mx-auto lg:text-sm sm:text-xl/relaxed">
              Streamline project management with our Issue Tracker – your
              all-in-one solution for efficiently tracking, organizing, and
              resolving tasks.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={"/api/auth/signin"}
                className="block w-fit rounded px-12 py-3 text-sm bg-primary text-primary-foreground font-medium  shadow focus:outline-none focus:ring sm:w-auto"
              >
                Get Started
              </Link>
            </div>
            <div className="flex justify-center mt-3 text-lg space-x-3">
              <Link
                className="p-2 rounded-full bg-primary text-primary-foreground "
                target="_blank"
                href={"https://github.com/avayyyyyyy/"}
              >
                <Github />
              </Link>
              <Link
                className="p-2 rounded-full bg-primary text-primary-foreground "
                target="_blank"
                href={"https://www.linkedin.com/in/shubhcodes/"}
              >
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
