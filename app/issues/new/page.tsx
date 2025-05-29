"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { issuePostSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type FormData = z.infer<typeof issuePostSchema>;

const NewIssuePage = () => {
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
      await axios.post("/api/issues", data);
      router.push("/issues/list");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitting(false);
      setErrorInfo("Cannot create issue");
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
          {...register("title")}
          placeholder="Title"
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return <SimpleMDE placeholder="Description" {...field} />;
          }}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit{isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
