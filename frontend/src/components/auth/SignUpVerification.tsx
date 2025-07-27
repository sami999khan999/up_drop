import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState } from "react";
import Spiner from "../ui/Spiner";

const SignUpVerification = ({
  isVerifying,
  resendCode,
  setVerificationCode,
  isLoading,
}: {
  isVerifying: boolean;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  resendCode: () => void;
  isLoading: boolean;
}) => {
  const numberOfFields = 6;
  const [codes, setCodes] = useState(new Array(numberOfFields).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [count, setCount] = useState(60);
  const [countdownTrigger, setCountdownTrigger] = useState(false);

  const handelChange = (val: string, index: number) => {
    const char = val.slice(-1);

    if (!/^[0-9]$/.test(char) && char !== "") return;

    const newCodes = [...codes];
    newCodes[index] = char;
    setCodes(newCodes);

    if (char && index < numberOfFields - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (codes[index] === "" && index > 0) {
        e.preventDefault();
        const newCodes = [...codes];
        newCodes[index - 1] = "";
        setCodes(newCodes);
        inputRefs.current[index - 1]?.focus();
      } else if (codes[index] !== "") {
        const newCodes = [...codes];
        newCodes[index] = "";
        setCodes(newCodes);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < numberOfFields - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handelPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const paste = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, numberOfFields);

    if (!/^\d*$/.test(paste)) return;

    const newCodes = new Array(numberOfFields).fill("");

    paste.split("").forEach((char, i) => {
      if (i < numberOfFields) newCodes[i] = char;
    });

    setCodes(newCodes);

    const lastFilledIndex = paste.length > 0 ? paste.length - 1 : 0;
    const focusIndex = Math.min(lastFilledIndex, numberOfFields - 1);

    if (inputRefs.current[focusIndex + 1]) {
      inputRefs.current[focusIndex + 1]?.focus();
    } else {
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handelResendCode = async () => {
    await resendCode();

    if (!isLoading) {
      setCount(60);
      setCountdownTrigger((prev) => !prev);
    }
  };

  useEffect(() => {
    setVerificationCode(codes.join(""));
  }, [codes, setVerificationCode]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isVerifying) {
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            if (intervalId) {
              clearInterval(intervalId);
            }
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isVerifying, countdownTrigger]);

  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full transition-all ease-in-out z-10 duration-300 border border-border-muted bg-bg rounded-xl p-space-xl",
        isVerifying
          ? "translate-y-0 animate-in"
          : "translate-y-full animate-out"
      )}
    >
      <div className="flex flex-col justify-center items-center h-full ">
        <div className="flex justify-between items-center w-full">
          {Array.from({ length: numberOfFields }).map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              onChange={(e) => handelChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handelPaste}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              value={codes[i]}
              pattern="[0-9]*"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="w-12 h-14 text-center text-2xl text-text rounded-md border-2 border-border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>
        <div className="ml-auto text-text border border-border-muted h-[2rem] relative w-[50%]  mt-space-base rounded-md">
          <div
            className={cn(
              "absolute bg-bg text-14 duration-200 h-full w-full flex items-center justify-center rounded-md",
              count > 0 && !isLoading
                ? "translate-y-0 animate-in"
                : "translate-y-full animate-out"
            )}
          >
            Re-Send Code In{" "}
            <span className="text-primary pl-space-xs">{count}</span>s
          </div>
          <button
            className={cn(
              "absolute bg-bg text-14 duration-200 h-full w-full hover:bg-bg-light cursor-pointer flex items-center justify-center rounded-md",
              count === 0 && !isLoading
                ? "-translate-y-0 animate-in"
                : "-translate-y-full animate-out"
            )}
            onClick={handelResendCode}
          >
            Send Code
          </button>
          <div
            className={cn(
              "absolute bg-bg text-14 duration-200 h-full w-full flex items-center justify-center rounded-md",
              isLoading
                ? "translate-y-0 animate-in"
                : "translate-y-full animate-out"
            )}
          >
            <Spiner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpVerification;
