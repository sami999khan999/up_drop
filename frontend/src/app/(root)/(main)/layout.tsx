import SideBar from "@/components/layout/SideBar";
import { cn } from "@/utils/cn";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 flex justify-center">
        <div
          className={cn(
            "w-[calc(100%-3.5rem)] md:w-[calc(100%-4rem)] xl:w-[1100px] 2xl:w-[1300px] min-h-screen px-space-md lg:px-space ml-auto xl:ml-0 bg-white"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
