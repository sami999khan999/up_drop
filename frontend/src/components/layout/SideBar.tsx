"use client";

import { SIDEBAR_ITEMS } from "@/constants/MenuConstants";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import Tooltip from "../ui/Tooltip";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "h-screen bg-bg text-text-muted transition-all duration-300 ease-in-out flex flex-col py-space-sm shadow-md border-r border-border-muted absolute xl:static overflow-hidden",
        isOpen
          ? "w-[12rem] xl:w-[14rem] 2xl:w-[17rem]"
          : "w-[3.5rem] md:w-[4rem] xl:w-[4.5rem]"
      )}
    >
      {/* Logo + App Name */}
      <div className="flex items-center pl-[0.1rem] md:pl-[0.4rem] xl:pl-[0.6rem] gap-space-sm transition-all duration-300">
        <Image
          src="/logo.png"
          alt="Up Drop logo"
          width={50}
          height={50}
          className="shrink-0"
        />
        <p
          className={cn(
            "text-text lg:text-18 font-semibold tracking-tight transition-opacity duration-300 line-clamp-1",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          Up Drop
        </p>
      </div>

      <hr className="my-space-md border-border-muted" />

      {/* Sidebar Items */}
      <div className="flex flex-col gap-space-base w-full overflow-auto h-full">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-space-md sidebar-spacing rounded-md transition-all duration-200 hover:bg-bg-light",
                  isActive && "bg-border-muted text-text hover:bg-primary"
                )}
              >
                {isOpen ? (
                  <span className="w-[1rem] shrink-0 text-lg">
                    {isActive ? item.iconActive : item.icon}
                  </span>
                ) : (
                  <Tooltip content={item.name} offset={2}>
                    <span className="w-[1rem] shrink-0 text-lg">
                      {isActive ? item.iconActive : item.icon}
                    </span>
                  </Tooltip>
                )}

                <p
                  className={cn(
                    "transition-opacity duration-300 line-clamp-1 overflow-hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  {item.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <hr className="my-space-md border-border-muted" />

      {/* Collapse Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-space-sm sidebar-spacing rounded-sm border-0 hover:bg-bg-light focus:ring-2 focus:ring-primary"
      >
        {isOpen ? (
          <span className="w-[1rem]">
            <RiMenuUnfold2Fill className="shrink-0" />
          </span>
        ) : (
          <Tooltip content="Collapse Menu" offset={2}>
            <span className="w-[1rem]">
              <RiMenuUnfold2Fill className="shrink-0" />
            </span>
          </Tooltip>
        )}

        <p
          className={cn(
            "transition-opacity duration-300 line-clamp-1 overflow-hidden text-14",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          Collapse Menu
        </p>
      </button>
    </div>
  );
};

export default SideMenu;
