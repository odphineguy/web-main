"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/leadAttribution";

export function AttributionCapture() {
  useEffect(() => captureFirstTouch(), []);
  return null;
}
