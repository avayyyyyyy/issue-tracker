"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import Spinner from "./Spinner";
const CreateIssue = () => {
  const [title, setTitile] = useState("");
  const [desc, setDesc] = useState("");
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();

  const createIssue = async (e: any) => {
    e.preventDefault();
    try {
      setDeleting(true);
      await axios.post("/api/issue/new", {
        title,
        description: desc,
      });
      router.push("/issue");
      router.refresh();
    } catch (error) {
      setDeleting(false);
    }
  };
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
          onChange={(e) => setTitile(e.target.value)}
          name="title"
          placeholder="Title "
        />
        <Label htmlFor="description">Description:</Label>
        <Textarea
          className="dark:bg-black/45"
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Type your message here."
        />

        {isDeleting ? (
          <>
            <Button
              className="w-full mt-4"
              disabled
              type="submit"
              onClick={(e) => createIssue(e)}
            >
              Submit
              {isDeleting && <Spinner />}
            </Button>
          </>
        ) : (
          <Button
            className="w-full mt-4"
            type="submit"
            onClick={(e) => createIssue(e)}
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default CreateIssue;
