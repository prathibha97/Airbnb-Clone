import prisma from '@/lib/prismaDb';

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // const safeListings = listings.map((listing) => ({
    //   ...listing,
    //   createdAt: listing.createdAt?.toISOString(),
    // }));

    // return safeListings;

    return listings
  } catch (error: any) {
    throw new Error(error);
  }
}
