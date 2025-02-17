import React from "react";
import "./Hello.sass";
import { Button } from "../ui/button";

export const Hello = () => {
  return (
    <div className="flex flex-col w-fit m-auto">
      <h1 className="text-6xl mb-4">Hello, Next.js!</h1>
      <Button variant={"default"}>Let's go</Button>
    </div>
  );
};

export default Hello;
