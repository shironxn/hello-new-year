"use client";

import Link from "next/link";
import { ModeToggle } from "./theme-toggle";

interface Link {
  title: string;
  href: string;
  description: string;
}

const navLink: Link[] = [
  {
    title: "Home",
    href: "/",
    description: "Home page",
  },
  {
    title: "About",
    href: "/about",
    description: "Website information",
  },
  {
    title: "Donation",
    href: "https://saweria.co/shironxn",
    description: "Kek bakal ada yang ngasih",
  },
];

export default function Navbar() {
  return (
    <div className="navbar bg-transparent fixed z-10 m-auto items-center justify-center flex">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        {navLink.map((value, index) => (
          <Link href={value.href} key={index} className="btn btn-ghost md:text-xl text-lg">
            {value.title}
          </Link>
        ))}
      </div>
      <div className="navbar-end">
        <ModeToggle />
      </div>
    </div>
  );
}
