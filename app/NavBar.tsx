"use client";
import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";

const NavBar = () => {
  return (
    <nav className="flex px-5 h-14 items-center mb-5 border-b border-gray-300">
      <Container>
        <Flex justify={"between"}>
          <Flex gap={"5"} align={"center"}>
            <Link href={"/"}>
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex gap-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={classNames("nav-link", {
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { data, status } = useSession();
  if (status === "loading")
    return <div className="w-8 h-8 bg-gray-200 rounded-full" />;
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href={"/api/auth/signin"}>
        Log in
      </Link>
    );
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={data?.user?.image || "/defaultUser.png"}
          fallback={"?"}
          radius="full"
          size="2"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size={"2"}>{data?.user?.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href={"/api/auth/signout"}>Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBar;
