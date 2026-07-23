import { useEffect, useState } from "react";
import type { BannerMessage } from "../types/banner";

const SUCCESS_MESSAGE_DURATION_MS = 3000;

export const useBankOperation = () => {
  const [message, setMessage] = useState<BannerMessage | null>(null);

  const clearMessage = () => setMessage(null);

  useEffect(() => {
    if (message?.variant !== "success") {
      return;
    }

    const timeoutId = setTimeout(clearMessage, SUCCESS_MESSAGE_DURATION_MS);

    return () => clearTimeout(timeoutId);
  }, [message]);

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
