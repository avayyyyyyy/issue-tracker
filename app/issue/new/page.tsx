"use client";
import Page from "@/app/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const page = () => {
  return (
    <div className="w-[90%] lg:max-w-xl mt-20  gap-y-4 flex flex-col m-auto">
      <h1 className="font-bold text-2xl lg:text-4xl text-center">
        New Issue 👇🏻
      </h1>
      <form action="/api/issue">
        <Label htmlFor="title">Title:</Label>
        <Input
          className="dark:bg-black/45"
          type="title"
          name="title"
          placeholder="Title "
        />
        <Label htmlFor="description">Description:</Label>
        <Textarea
          className="dark:bg-black/45"
          placeholder="Type your message here."
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default page;
