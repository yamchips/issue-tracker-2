import { Link as RadixLink } from "@radix-ui/themes";

import Link from "next/link";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Link> {
  name: string;
}

const CustomLink = ({ href, name, ...props }: Props) => {
  return (
    <RadixLink asChild>
      <Link href={href} {...props}>
        {name}
      </Link>
    </RadixLink>
  );
};

export default CustomLink;
