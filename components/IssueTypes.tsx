"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigDown } from "lucide-react";

export default function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="dark:bg-black" asChild>
        <Button variant="outline">All</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-black">
        <DropdownMenuLabel>All</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Open</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Pending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Completed</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
