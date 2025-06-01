"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { issuePostSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import SimpleMDE from "react-simplemde-editor";
type FormData = z.infer<typeof issuePostSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [errorInfo, setErrorInfo] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(issuePostSchema),
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const submitFunc = async (data: FormData) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues/list");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitting(false);
      if (issue) {
        setErrorInfo("Cannot update issue");
      } else {
        setErrorInfo("Cannot create issue");
      }
    }
  };
  return (
    <div className="max-w-xl space-y-3">
      {errorInfo && (
        <Callout.Root color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{errorInfo}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(submitFunc)}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => {
            return <SimpleMDE placeholder="Description" {...field} />;
          }}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>
          {issue ? "Update Issue" : "Submit Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
