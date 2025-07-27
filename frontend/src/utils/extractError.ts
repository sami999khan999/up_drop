export const extractClerkError = (err: unknown) => {
  if (typeof err === "object" && err !== null) {
    const maybeClerkError = err as {
      errors?: { message: string }[];
      message?: string;
    };

    return (
      maybeClerkError?.errors?.[0]?.message ||
      maybeClerkError?.message ||
      "Something went wrong."
    );
  }

  return "Something went wrong. Please try again.";
};
