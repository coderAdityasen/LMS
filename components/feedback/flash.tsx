"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function Flash({ message }: { message?: string }) {
  const seen = useRef(false);
  useEffect(() => {
    if (!message || seen.current) return;
    seen.current = true;
    toast.success(message);
  }, [message]);
  return null;
}
