import { defineRouting } from "next-intl/routing";

// Define the supported locales as a type
export type Locale = "ar" | "en";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ar", "en"] as Locale[], // Explicitly type the locales array

  // Used when no locale matches
  defaultLocale: "ar",
  localeDetection: false,
});

