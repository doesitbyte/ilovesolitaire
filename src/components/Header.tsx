"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black shadow-2xl mb-4 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src="/img/logo.png" alt="logo" height={24} width={100} />
        </Link>
        <div className="hidden md:flex space-x-4">
          <div className="relative group">
            <button className=" focus:outline-none">Klondike Solitaire</button>
            <div className="absolute hidden group-hover:block bg-white rounded shadow-lg">
              <Link
                href="/klondike"
                className="block px-4 py-2  hover:bg-white"
              >
                Klondike Turn 1
              </Link>
              <Link
                href="/klondike/turn-3"
                className="block px-4 py-2  hover:bg-white"
              >
                Klondike Turn 3
              </Link>
            </div>
          </div>
          <div className="relative group">
            <button className=" focus:outline-none">Spider Solitaire</button>
            <div className="absolute hidden group-hover:block bg-white rounded shadow-lg">
              <Link href="/spider" className="block px-4 py-2  hover:bg-white">
                Spider 1 Suit
              </Link>
              <Link
                href="/spider/2-suits"
                className="block px-4 py-2  hover:bg-white"
              >
                Spider 2 Suits
              </Link>
              <Link
                href="/spider/4-suits"
                className="block px-4 py-2  hover:bg-white"
              >
                Spider 4 Suits
              </Link>
            </div>
          </div>
          <Link href="/freecell" className="">
            Freecell Solitaire
          </Link>
        </div>
        <button
          className="md:hidden  focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex gap-4 px-2 pt-2 pb-3 space-y-1">
            <div className="relative group">
              <button className="block px-3 py-2 rounded-md text-base font-medium ">
                Klondike Solitaire
              </button>
              <div className="absolute bg-white rounded shadow-lg">
                <Link
                  href="/klondike?variant=turn_1"
                  className="block px-4 py-2  hover:bg-white"
                >
                  Klondike Turn 1
                </Link>
                <Link
                  href="/klondike?variant=turn_3"
                  className="block px-4 py-2  hover:bg-white"
                >
                  Klondike Turn 3
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="block px-3 py-2 rounded-md text-base font-medium ">
                Spider Solitaire
              </button>
              <div className="absolute bg-white rounded shadow-lg">
                <Link
                  href="/spider?variant=suit_1"
                  className="block px-4 py-2  hover:bg-white"
                >
                  Spider 1 Suit
                </Link>
                <Link
                  href="/spider?variant=suit_2"
                  className="block px-4 py-2  hover:bg-white"
                >
                  Spider 2 Suits
                </Link>
                <Link
                  href="/spider?variant=suit_4"
                  className="block px-4 py-2  hover:bg-white"
                >
                  Spider 4 Suits
                </Link>
              </div>
            </div>
            <Link
              href="/freecell"
              className="block px-3 py-2 rounded-md text-base font-medium "
            >
              Freecell Solitaire
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
