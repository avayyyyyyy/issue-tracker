"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type props = {
  users: { name: string };
  id: { id: number };
};

export default function DropdownMenuRadioGroupDemo({ users, id }: props) {
  const [position, setPosition] = React.useState("Unassigned");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="dark:bg-black w-full" asChild>
        <Button variant="outline">
          {position} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-black">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {users.map((e, i) => {
            return (
              <DropdownMenuRadioItem key={i} value={e.name}>
                {e.name}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
