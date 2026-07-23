import { useState } from "react";
import type { BannerMessage } from "../types/banner";

export const useBankOperation = () => {
  const [message, setMessage] = useState<BannerMessage | null>(null);

  const clearMessage = () => setMessage(null);

  const run = (action: () => string) => {
    try {
      const successText = action();
      setMessage({ variant: "success", text: successText });
      return true;
    } catch (error) {
      setMessage({
        variant: "error",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
      return false;
    }
  };

  return { message, run, clearMessage };
};
