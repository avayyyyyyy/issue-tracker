"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "./ui/textarea";

type Props = {
  issue: {
    id: number;
    title: string | number;
    description: string | number;
    status: string;
    createdAt: Date | number;
    updatedAt: Date | number;
    userId: string | number;
  };
};

const EditIssue = (props: Props) => {
  const { issue } = props;
  return (
    <div className="w-[90%] lg:max-w-xl mt-20  gap-y-4 flex flex-col m-auto">
      <h1 className="font-bold text-2xl lg:text-4xl text-center">
        Update Issue 👇🏻
      </h1>
      <Label htmlFor="title">Title:</Label>
      <Input
        className="dark:bg-black/45"
        type="title"
        name="title"
        value={issue?.title}
        placeholder="Title "
      />
      <Label htmlFor="description">Description:</Label>
      <Textarea
        className="dark:bg-black/45"
        value={issue?.description}
        rows={15}
        placeholder="Type your message here."
      />
      <Button type="submit">Update</Button>
    </div>
  );
};

export default EditIssue;
