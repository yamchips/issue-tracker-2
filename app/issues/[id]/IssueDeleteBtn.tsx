"use client";
import { Issue } from "@prisma/client";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const IssueDeleteBtn = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const onDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issue.id);
      router.push("/issues/list");
    } catch (error) {
      setDeleting(false);
      setServerError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <AiOutlineDelete />
            Delete Issue
            {deleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirmation</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure? The delete operation cannot be undone.
          </AlertDialog.Description>
          <Flex gap={"3"} justify={"end"} mt={"4"}>
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={onDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={serverError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Internal Server Error</AlertDialog.Title>
          <AlertDialog.Description>
            Cannot delete current issue.
          </AlertDialog.Description>
          <Flex gap={"3"} justify={"end"} mt={"4"}>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={() => {
                  setServerError(false);
                }}
              >
                OK
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueDeleteBtn;
