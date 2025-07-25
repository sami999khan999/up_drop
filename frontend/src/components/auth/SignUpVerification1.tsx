import { cn } from "@/utils/cn";
import { useRef, useState, useEffect } from "react"; // Import useState and useEffect

const SignUpVerification = ({
  isVerifying,
  setVerificationCode,
  resendCode,
  isLoading,
}: {
  isVerifying: boolean;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  resendCode: () => void;
  isLoading: boolean;
}) => {
  const numberOfFields = 6;
  const [codes, setCodes] = useState<string[]>(
    new Array(numberOfFields).fill("")
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    const char = value.slice(-1);

    if (!/^[0-9]$/.test(char) && char !== "") {
      return;
    }

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

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, numberOfFields);

    if (!/^\d*$/.test(paste)) {
      return;
    }

    const newCodes = new Array(numberOfFields).fill("");
    paste.split("").forEach((char, i) => {
      if (i < numberOfFields) {
        newCodes[i] = char;
      }
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

  useEffect(() => {
    setVerificationCode(codes.join(""));
  }, [codes, setVerificationCode]);

  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out z-10",
        isVerifying
          ? "translate-y-0 animate-in"
          : "translate-y-full animate-out"
      )}
    >
      <div className="bg-white w-full h-full flex justify-center items-center">
        <div className="max-w-sm w-full mx-auto bg-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-lg font-semibold text-primary mb-1">
            Enter Verification Code
          </h2>
          <p className="text-sm text-gray-600 mb-6">We’ve sent a code to </p>

          <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
            {Array.from({ length: numberOfFields }).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={codes[i]}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                className="w-12 h-14 text-center text-2xl font-bold border rounded-md border-blue-200 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Didn’t get a code?{" "}
            <button
              onClick={resendCode}
              className="text-blue-600 hover:underline font-medium"
            >
              Click to Resend
            </button>
          </p>

          <button
            type="button"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-md text-sm font-semibold tracking-wide hover:opacity-90 transition"
          >
            VERIFY
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpVerification;
