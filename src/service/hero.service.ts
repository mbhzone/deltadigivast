export const getHeroData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hero/1245e851-4ef4-4ea6-a3f2-84e8fe7ba65b`,
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
