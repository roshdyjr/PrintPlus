import { defineRouting } from 'next-intl/routing';

// Define the supported locales as a type
export type Locale = 'en' | 'ar';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'] as Locale[], // Explicitly type the locales array

  // Used when no locale matches
  defaultLocale: 'en',
});