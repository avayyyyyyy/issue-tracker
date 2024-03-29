"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import ToogleTheme from "./ToogleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const session = useSession();
  const path = usePathname();

  return (
    <div>
      <div className="flex py-5 border-b-2 items-center justify-between px-4 lg:px-10">
        <div>
          <Link
            href={"/"}
            className="font-semibold p-2 bg-primary text-secondary px-3 text-lg"
          >
            Issue Tracker
          </Link>
        </div>
        <div className="space-x-4 flex items-center font-normal">
          <ToogleTheme />

          {session.status === "authenticated" ? (
            <div className="flex  items-center gap-x-4">
              <Link
                className={`${path == "/dashboard" ? "text-primary/60" : null}`}
                href={"/dashboard"}
              >
                Dashboard
              </Link>
              <Link
                className={`${path == "/issue" ? "text-primary/60" : null}
                }`}
                href={"/issue"}
              >
                Issue
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={session.data?.user?.image ?? ""}
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {session.data?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-fit pt-3 border-2 mr-8 gap-y-4 bg-primary-foreground space-y-2 p-3 rounded-lg ">
                  <DropdownMenuLabel className="text-sm text-primary select-none border-b-2 border-primary/10 pb-3">
                    {session.data?.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel
                    onClick={() => signOut()}
                    className="text-sm py-1 rounded-md px-2 hover:bg-red-600 hover:text-primary-foreground dark:hover:text-white  text-primary cursor-pointer"
                  >
                    Logout
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={() => signIn()}>Login</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
