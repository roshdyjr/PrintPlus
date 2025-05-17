// lib/api.ts
export const fetchTermsAndConditions = async (locale: string = 'en') => {
  try {
    const response = await fetch(
      'https://printplus.print-dev.com/user-api/public/terms',
      {
        headers: {
          'Accept-Language': locale,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch terms and conditions');
    }

    const data = await response.json();
    return data.success ? data.data.termsAndConditions : null;
  } catch (error) {
    console.error('Error fetching terms:', error);
    return null;
  }
};