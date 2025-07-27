import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spiner = ({ className }: { className?: ClassValue }) => {
  return (
    <AiOutlineLoading3Quarters
      className={cn("animate-spin text-18", className)}
    />
  );
};

export default Spiner;
