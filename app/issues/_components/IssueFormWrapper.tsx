"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";
import { Issue } from "@prisma/client";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const IssueFormWrapper = ({ issue }: { issue: Issue }) => {
  return <IssueForm issue={issue} />;
};

export default IssueFormWrapper;
