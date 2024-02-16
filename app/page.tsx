import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <div>
      <section className="">
        <div className="mx-auto mt-40 lg:mt-0 h-screen max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl mb-4 font-extrabold sm:text-5xl">
              Understand User Flow.
              <div className="font-extrabold w-fit mx-auto bg-primary text-primary-foreground sm:block">
                {" "}
                Increase Conversion.{" "}
              </div>
            </h1>
            <p className="mt-4 max-w-md mx-auto sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button className="block w-fit rounded px-12 py-3 text-sm font-medium  shadow focus:outline-none focus:ring sm:w-auto">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
