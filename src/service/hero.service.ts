export const getHeroData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hero/14add2d7-1979-4613-bff1-03284ca24760`,
    {
      next: {
        revalidate: 30,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch hero data');
  }

  return res.json();
};
