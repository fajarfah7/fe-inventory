import { z } from "zod";

export function formatZodErrors(error: z.ZodError) {
  const formatted: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = issue.path.join(".");
    // Only keep first message per field
    if (!formatted[field]) {
      formatted[field] = issue.message;
    }
  }

  return formatted;
}
