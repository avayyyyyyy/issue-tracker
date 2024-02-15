"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import ToogleTheme from "./ToogleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

const NavBar = () => {
  const session = useSession();

  return (
    <>
      <div className="flex py-5 border-b-2 items-center justify-between px-4 lg:px-10">
        <div>
          <Link href={"/"} className=" text-lg">
            Issue Tracker
          </Link>
        </div>
        <div className="space-x-4 flex items-center font-normal">
          <ToogleTheme />
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/issue"}>Issue</Link>
          {session.status === "authenticated" ? (
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
              <DropdownMenuContent className="pr-16 pt-3 gap-y-4 bg-primary-foreground space-y-2 p-3 rounded-lg cursor-pointer">
                <DropdownMenuLabel className="text-sm text-primary cursor-default">
                  {session.data?.user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel
                  onClick={() => signOut()}
                  className="text-sm text-primary text-red-600 hover:text-red-400 cursor-pointer"
                >
                  Logout
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>Login</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
