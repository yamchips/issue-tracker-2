"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import dynamic from "next/dynamic";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
