"use client";
import { Container, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

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
          <Text>Log in</Text>
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
            className={classNames(
              "nav-link",
              "text-zinc-500",
              "hover:text-zinc-800",
              "transition-colors",
              {
                "text-zinc-900": link.href === currentPath,
              }
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default NavBar;
